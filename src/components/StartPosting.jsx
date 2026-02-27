import Image from "next/image";
import Link from "next/link";

export default function StartPosting() {
  return (
    <section className="w-full py-10 px-6 md:px-16 bg-white overflow-hidden">
      <div
        className="max-w-7xl mx-auto relative"
        style={{ minHeight: "480px" }}
      >
        <div
          className="bg-[#483dff] absolute inset-0 z-0"
          style={{
            clipPath:
              "polygon(88px 0, 100% 0, 100% calc(100% - 88px), calc(100% - 88px) 100%, 0 100%, 0 88px)",
          }}
        />

        {/* Mobile layout */}
        <div className="relative z-10 flex flex-col md:hidden px-8 pt-16 pb-10">
          <h2 className="text-4xl font-bold font-display text-white leading-[1.1] mb-4 tracking-tight">
            Start posting <br /> jobs today
          </h2>
          <p className="text-base text-white/90 mb-8 font-medium">
            Start posting jobs for only $10.
          </p>
          <Link
            href="#"
            className="inline-block bg-white text-[#483dff] font-bold text-base px-8 py-4 border-2 border-white hover:bg-transparent hover:text-white transition-colors self-start mb-8"
          >
            Sign Up For Free
          </Link>
          <div className="relative w-full h-52">
            <Image
              src="/assests/3.1 Dashboard Company.png"
              alt="Dashboard Preview"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div
          className="relative z-10 hidden md:flex items-center h-full"
          style={{ minHeight: "480px" }}
        >
          <div className="w-1/2 lg:w-[45%] py-16 pl-8 md:pl-16 pr-4">
            <h2 className="text-5xl md:text-6xl font-bold font-display text-white leading-[1.1] mb-6 tracking-tight">
              Start posting <br /> jobs today
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-medium">
              Start posting jobs for only $10.
            </p>
            <Link
              href="#"
              className="inline-block bg-white text-[#483dff] font-bold text-lg px-10 py-5 border-2 border-white hover:bg-transparent hover:text-white transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          <div className="w-1/2 lg:w-[50%] absolute right-15 top-71 -translate-y-1/2 h-[115%] pointer-events-none">
            <Image
              src="/assests/3.1 Dashboard Company.png"
              alt="Dashboard Preview"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
