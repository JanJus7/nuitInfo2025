import Image from "next/image";
import Hero from "./components/Hero";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-white">
        <Hero />
      </div>
    </div>
  );
}
