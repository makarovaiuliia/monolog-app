"use client";

import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { login } from "../../api/login";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./AuthForm.module.css";
import { useState } from "react";
import { signup } from "../../api/signup";

type InputsLogin = {
  email: string;
  password: string;
};

type InputsSignup = InputsLogin & {
  username: string;
};

interface Props {
  isSignUp?: boolean;
}

export const AuthForm = ({ isSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin | InputsSignup>();

  const [serverError, setServerError] = useState("");

  const onSubmit: SubmitHandler<InputsLogin | InputsSignup> = async (data) => {
    try {
      if (isSignUp) {
        await signup(data as InputsSignup);
      } else {
        await login(data as InputsLogin);
      }
    } catch (err: any) {
      console.log(err);
      setServerError(err.message ? err.message : "Internal server error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root} noValidate>
      <div className={styles.inputs}>
        {isSignUp && (
          <Input
            placeholder="username"
            type="text"
            register={register}
            label={"username"}
            required={true}
            errorMessage={(errors as any)?.username?.message}
            validation={{
              required: "Username is required",
              min: { value: 3, message: "Username must be at least 3 symbols" },
              max: {
                value: 20,
                message: "Username must be no more than 20 symbols",
              },
              pattern: {
                value: /^[A-Za-z0-9.$]+$/,
                message:
                  "You can only use latin letters, numbers, dots and dollar sign in your username",
              },
            }}
          />
        )}
        <Input
          placeholder="example@gmail.com"
          type="email"
          register={register}
          label={"email"}
          required={true}
          errorMessage={errors.email?.message}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
        />
        <Input
          placeholder="password"
          type="password"
          register={register}
          label={"password"}
          required={true}
          validation={
            isSignUp
              ? {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }
              : {}
          }
          errorMessage={errors.password?.message}
        />
      </div>
      <div>
        <Button text={isSignUp ? "Sign up" : "Log in"} type="submit" />
        {serverError && <span className={styles.error}>{serverError}</span>}
      </div>
    </form>
  );
};
