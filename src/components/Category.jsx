import Link from "next/link";
import {
  PencilRuler,
  BarChart3,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";

const categories = [
  { name: "Design", jobs: 235, icon: PencilRuler },
  { name: "Sales", jobs: 756, icon: BarChart3 },
  { name: "Marketing", jobs: 140, icon: Megaphone },
  { name: "Finance", jobs: 325, icon: Wallet },
  { name: "Technology", jobs: 436, icon: Monitor },
  { name: "Engineering", jobs: 542, icon: Code2 },
  { name: "Business", jobs: 211, icon: Briefcase },
  { name: "Human Resource", jobs: 346, icon: Users },
];

export default function Category() {
  return (
    <section className="w-full py-16 px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900">
            Explore by <span className="text-blue-500">category</span>
          </h2>
          <Link
            href="#"
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`p-8 border border-slate-200 hover:border-blue-600 rounded-none cursor-pointer transition-all duration-300 group ${
                category.active
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white hover:bg-blue-600"
              }`}
            >
              <div className="mb-6">
                <category.icon
                  className={`w-10 h-10 ${
                    category.active
                      ? "text-white"
                      : "text-blue-600 group-hover:text-white"
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              <h3
                className={`text-2xl font-bold font-display mb-3 ${
                  category.active
                    ? "text-white"
                    : "text-slate-900 group-hover:text-white"
                }`}
              >
                {category.name}
              </h3>

              <div className="flex items-center justify-between">
                <span
                  className={`text-base ${
                    category.active
                      ? "text-blue-100"
                      : "text-slate-500 group-hover:text-blue-100"
                  }`}
                >
                  {category.jobs} jobs available
                </span>
                <ArrowRight
                  className={`w-6 h-6 ${
                    category.active
                      ? "text-white"
                      : "text-slate-900 group-hover:text-white"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

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
