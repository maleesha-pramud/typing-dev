import TypingTest from "@/components/layouts/TypingTest";
import Navigationbar from "@/components/elements/Navigationbar"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
      <Navigationbar />
      <TypingTest />
    </main>
  );
}
