import TypingTest from "@/components/layouts/TypingTest";
import Navigationbar from "@/components/elements/Navigationbar"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-accent-dark">
      <Navigationbar />
      <TypingTest />
    </main>
  );
}
