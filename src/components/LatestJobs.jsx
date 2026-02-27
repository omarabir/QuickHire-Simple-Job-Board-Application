import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const jobs = [
  {
    icon: "/assests/latest jobs/image1.png",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image2.png",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image3.png",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image4.png",
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image5.png",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image6.png",
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image7.png",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    icon: "/assests/latest jobs/image8.png",
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
  },
];

const tagStyles = {
  "Full-Time": "border border-teal-400 text-teal-500 bg-transparent",
  Marketing: "border border-orange-400 text-orange-500 bg-transparent",
  Design: "border border-purple-400 text-purple-600 bg-transparent",
};

export default function LatestJobs() {
  return (
    <section className="w-full py-16 px-6 md:px-16 bg-[#f0f0f8] relative overflow-hidden">
 
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none">
          <line
            x1="260"
            y1="0"
            x2="160"
            y2="260"
            stroke="#c7c7e0"
            strokeWidth="1.5"
          />
          <line
            x1="230"
            y1="0"
            x2="130"
            y2="260"
            stroke="#c7c7e0"
            strokeWidth="1.5"
          />
          <line
            x1="200"
            y1="0"
            x2="100"
            y2="260"
            stroke="#c7c7e0"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none">
          <line
            x1="260"
            y1="0"
            x2="160"
            y2="260"
            stroke="#c7c7e0"
            strokeWidth="1.5"
          />
          <line
            x1="230"
            y1="0"
            x2="130"
            y2="260"
            stroke="#c7c7e0"
            strokeWidth="1.5"
          />
          <line
            x1="200"
            y1="0"
            x2="100"
            y2="260"
            stroke="#c7c7e0"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
    
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900">
            Latest <span className="text-blue-400">jobs open</span>
          </h2>
          <Link
            href="#"
            className="hidden md:flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 p-6 flex items-center gap-5 cursor-pointer group"
            >
            
              <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={job.icon}
                  alt={job.company}
                  fill
                  className="object-cover"
                />
              </div>

          
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-500 mb-3">
                  {job.company}&nbsp;•&nbsp;{job.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${tagStyles[tag] ?? "border border-gray-300 text-gray-500"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="md:hidden mt-8 flex justify-center">
          <Link
            href="#"
            className="flex items-center gap-2 text-purple-600 font-semibold"
          >
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
