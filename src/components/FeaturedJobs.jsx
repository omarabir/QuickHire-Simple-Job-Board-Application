import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tagColors = {
  Marketing: "bg-orange-100 text-orange-500",
  Design: "bg-teal-100 text-teal-500",
  Business: "bg-purple-100 text-purple-600",
  Technology: "bg-red-100 text-red-500",
};

const jobs = [
  {
    icon: "/assests/feature jobs/Email Marketing.png",
    type: "Full Time",
    title: "Social Media Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    tags: ["Marketing", "Design"],
  },
  {
    icon: "/assests/feature jobs/brand designer.png",
    type: "Full Time",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    tags: ["Design", "Business"],
  },
  {
    icon: "/assests/feature jobs/brand marketing.png",
    type: "Full Time",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    tags: ["Marketing"],
  },
  {
    icon: "/assests/feature jobs/image.png",
    type: "Full Time",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    description:
      "Blinklist is looking for Visual Designer to help team desi ...",
    tags: ["Design"],
  },
  {
    icon: "/assests/feature jobs/Product Designer.png",
    type: "Full Time",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    tags: ["Marketing", "Design"],
  },
  {
    icon: "/assests/feature jobs/lead designer.png",
    type: "Full Time",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    tags: ["Design", "Business"],
  },
  {
    icon: "/assests/feature jobs/brand strategist.png",
    type: "Full Time",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    tags: ["Marketing"],
  },
  {
    icon: "/assests/feature jobs/data analyst.png",
    type: "Full Time",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    tags: ["Technology"],
  },
];

export default function FeaturedJobs() {
  return (
    <section className="w-full py-16 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900">
            Featured <span className="text-blue-500">jobs</span>
          </h2>
          <Link
            href="#"
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 p-6 cursor-pointer group"
            >
              {/* Logo + Badge row */}
              <div className="flex items-start justify-between mb-5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={job.icon}
                    alt={job.company}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="border border-blue-500 text-blue-500 text-xs font-semibold px-3 py-1">
                  {job.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>

              {/* Company + Location */}
              <p className="text-sm text-slate-500 mb-4">
                {job.company} &nbsp;·&nbsp; {job.location}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                {job.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-4 py-1 rounded-full ${tagColors[tag] ?? "bg-gray-100 text-gray-500"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile show all */}
        <div className="md:hidden mt-8 flex justify-center">
          <Link
            href="#"
            className="flex items-center gap-2 text-blue-600 font-semibold"
          >
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
