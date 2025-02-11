import { AuthPageWidget } from "@/widgets/AuthPageWidget/AuthPageWidget";

export default function SignInPage() {
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
      <AuthPageWidget />
    </main>
  );
}
