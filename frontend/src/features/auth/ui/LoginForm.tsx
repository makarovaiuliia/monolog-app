import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { login } from "../api/login";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmai.com"
        type="email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button text="Log In" type="submit" />
    </form>
  );
};
