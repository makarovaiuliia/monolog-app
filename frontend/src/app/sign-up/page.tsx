import { AuthForm } from "@/features/auth/ui/AuthForm/AuthForm";
import { Header } from "@/shared/ui/Header/Header";
import Link from "next/link";

export default function SignUpPage() {
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
        title="Sign up for monolog"
        subtitle={
          <>
            Already have an account?{" "}
            <Link
              style={{ fontWeight: "600", cursor: "pointer" }}
              href="/sign-in"
            >
              Log in
            </Link>
          </>
        }
      />
      <AuthForm isSignUp={true} />
    </main>
  );
}
