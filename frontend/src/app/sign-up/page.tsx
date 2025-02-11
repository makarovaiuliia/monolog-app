import { AuthPageWidget } from "@/widgets/AuthPageWidget/AuthPageWidget";

export default function SignUpPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100dvh",
        backgroundColor: "var(--background-color)",
      }}
    >
      <AuthPageWidget isSignUp={true} />
    </main>
  );
}
