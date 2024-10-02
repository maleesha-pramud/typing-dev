import Image from "next/image";
import TypingTest from "@/components/layouts/TypingTest";

export default function Home() {
  return (
    <main>
      <h1 className="text-center">Welcome to Typing Dev</h1>
      <hr/>
      <TypingTest />
    </main>
  );
}
