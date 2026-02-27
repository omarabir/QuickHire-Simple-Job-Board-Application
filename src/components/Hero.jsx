import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="flex-1 space-y-6 z-10 w-full pt-10 md:pt-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display text-slate-900">
          Discover <br />
          more than <br />
          <span className="relative text-blue-500 inline-block">
            5000+ Jobs
            <svg
              className="absolute -bottom-2 left-0 w-full h-4 text-blue-500"
              viewBox="0 0 200 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00025 6.99997C26.5002 3.49997 101 -3.00003 198 2.49997"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M4.00025 8.99997C28.5002 5.49997 103 -1.00003 196 4.49997"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-50"
              />
            </svg>
          </span>
        </h1>

        <p className="text-slate-500  max-w-md leading-relaxed">
          Great platform for the job seeker that searching for new career
          heights and passionate about startups.
        </p>

        {/* Search Box */}
        <div className="bg-white p-4 lg:p-2 shadow-xl rounded-lg flex flex-col lg:flex-row gap-4 lg:gap-2 border border-slate-100 max-w-2xl w-full">
          <div className="flex items-center w-full pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-200 px-2">
            <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full outline-none text-slate-700 placeholder:text-slate-400 font-medium text-base lg:text-sm xl:text-base"
            />
          </div>

          <div className="flex items-center w-full pb-2 lg:pb-0 px-2">
            <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
            <div className="relative w-full flex items-center">
              <select className="w-full outline-none text-slate-700 bg-transparent font-medium appearance-none cursor-pointer pr-6 text-base lg:text-sm xl:text-base">
                <option>Florence, Italy</option>
                <option>New York, USA</option>
                <option>London, UK</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <button className="bg-blue-600 text-white font-medium text-base lg:text-sm xl:text-base px-6 py-3 lg:py-2 rounded-md hover:bg-blue-700 transition w-full lg:w-auto shrink-0 shadow-lg shadow-blue-600/30 whitespace-nowrap">
            Search my job
          </button>
        </div>

        <div className="text-sm text-slate-500 ">
          Popular : UI Designer, UX Researcher, Android, Admin
        </div>
      </div>
      <div className="flex-1 relative w-full hidden md:flex justify-center md:justify-end z-10">
        <div className="relative w-full max-w-md aspect-[4/5]">
          <Image
            src="/assests/men.png"
            alt="Happy job seeker pointing"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div
        className="hidden md:block absolute bottom-0 right-0 w-[50%] h-[20%] bg-white z-20 translate-y-[1px]"
        style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 0%)" }}
      />{" "}
    </section>
  );
}
