import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from "lucide-react";

const aboutLinks = [
  "Companies",
  "Pricing",
  "Terms",
  "Advice",
  "Privacy Policy",
];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1e1e2d] text-white">
    
      <div className=" mx-auto px-6 md:px-28 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-9 h-9">
                <Image
                  src="/assests/logo.png"
                  alt="QuickHire"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">
                QuickHire
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

     
          <div>
            <h4 className="text-white font-bold text-base mb-6">About</h4>
            <ul className="space-y-4">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          <div>
            <h4 className="text-white font-bold text-base mb-6">Resources</h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

     
          <div>
            <h4 className="text-white font-bold text-base mb-3">
              Get job notifications
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white text-slate-900 placeholder-slate-400 text-sm px-4 py-3 outline-none min-w-0"
              />
              <button className="bg-[#483dff] hover:bg-[#3730d4] text-white font-bold text-sm px-5 py-3 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            2021 @ QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Dribbble, label: "Dribbble" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
            ].map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
