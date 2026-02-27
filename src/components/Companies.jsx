import Image from "next/image";

const companies = [
  { name: "Vodafone", logo: "/assests/Company/vodafone-2017-logo.png" },
  { name: "Intel", logo: "/assests/Company/intel-3.png" },
  { name: "Tesla", logo: "/assests/Company/tesla-9 1.png" },
  { name: "AMD", logo: "/assests/Company/amd-logo-1.png" },
  { name: "Talkit", logo: "/assests/Company/talkit 1.png" },
];

export default function Companies() {
  return (
    <div className="w-full mx-auto   bg-white px-26 py-4 ">
      <p className="text-gray-400 text-lg font-medium mb-6">
        Companies we helped grow
      </p>

      <div className="flex justify-between flex-wrap gap-8 md:gap-12 items-center ">
        {companies.map((company) => (
          <div
            key={company.name}
            className="relative w-24 h-8 md:w-32 md:h-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
