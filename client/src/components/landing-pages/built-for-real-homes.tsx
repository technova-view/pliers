import { Badge } from "@/components/ui/badge";

interface Category {
  name: string;
}

interface BuiltForRealHomesProps {
  title?: string;
  badgeText?: string;
  subtitle?: string;
  categories: Category[];
  footerText?: string;
}

export function BuiltForRealHomes({
  categories,
}: BuiltForRealHomesProps) {
  return (
    <section className="py-20 bg-secondary">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-5">
              Connecting You With Trusted <br />
              Professionals
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md mb-8">
              Our network includes verified contractors across South Africa,
              ready to assist with home repairs, maintenance, and renovation
              services.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 gap-y-3">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-xs font-medium rounded-full text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block">
            <img
              src="/contractors.jpeg"
              alt="Professional contractor at work"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Smooth blend into background */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-secondary/40 to-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
