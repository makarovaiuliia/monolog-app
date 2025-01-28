import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { register } from "../api/register";

export const RegisterFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ email, password, username });
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        type="text"
      />
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
