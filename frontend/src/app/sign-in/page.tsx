import { AuthForm } from "@/features/auth/ui/AuthForm/AuthForm";
import { Header } from "@/shared/ui/Header/Header";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100dvh",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Header
        title="Log into your account"
        subtitle={
          <>
            New to monolog?{" "}
            <Link
              style={{ fontWeight: "600", cursor: "pointer" }}
              href="/sign-up"
            >
              Sign up
            </Link>
          </>
        }
      />
      <AuthForm />
    </main>
  );
}
