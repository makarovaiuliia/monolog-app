import { AddEntryForm } from "@/features/addEntry/ui/AddEntryForm/AddEntryForm";
import { Header } from "@/shared/ui/Header/Header";

export default function AddEntryPage() {
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
      <Header title="Share some thoughts with your personal diary" />
      <AddEntryForm />
    </main>
  );
}
