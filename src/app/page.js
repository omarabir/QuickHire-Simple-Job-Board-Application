import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Companies from "../components/Companies";
import Category from "../components/Category";
import StartPosting from "../components/StartPosting";

export default function Home() {
  return (
    <div>
      <div className="h-screen w-full flex flex-col relative ">
        <div className="absolute top-75 right-75 -z-10 w-[600px] h-full pointer-events-none">
          <Image
            src="/assests/Pattern.png"
            alt="background pattern"
            fill
            className="object-contain object-right-top scale-150 translate-x-1/4 -translate-y-1/4 opacity-50"
            priority
          />
        </div>

        <div className="flex-none z-50 relative">
          <Header />
        </div>

        <main className="flex-1 w-full relative flex flex-col items-center justify-center">
          <Hero />
        </main>
      </div>

      <Companies />
      <Category />
      <StartPosting />
    </div>
  );
}
