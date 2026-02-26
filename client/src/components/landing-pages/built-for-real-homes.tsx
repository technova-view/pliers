import { Badge } from "@/components/ui/badge";

interface Category {
  icon: React.ReactNode;
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
  title = "Built for Real Homes",
  badgeText = "Built for You",
  subtitle = "Whether it's:",
  categories,
  footerText = "Pliers is designed for everyday home problems.",
}: BuiltForRealHomesProps) {
  return (
    <section className="from-secondary/2 to-secondary/5 bg-linear-to-b py-16 md:py-20">
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="border-primary/20 text-primary bg-primary/5 animate-in fade-in slide-in-from-top-4 mb-4 px-4 py-1.5 font-medium duration-700"
          >
            {badgeText}
          </Badge>

          <h2 className="text-secondary animate-in fade-in slide-in-from-bottom-4 mb-3 text-3xl font-semibold tracking-tight delay-100 duration-700 md:text-4xl">
            {title}
          </h2>

          <div className="animate-in fade-in flex items-center justify-center gap-3 delay-200 duration-700">
            <div className="bg-primary/30 h-px w-8" />
            <p className="text-secondary/70 text-base">{subtitle}</p>
            <div className="bg-primary/30 h-px w-8" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group border-secondary/10 animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center rounded-xl border bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md md:p-5"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon Container with Gradient */}
              <div className="mb-3">
                <div className="from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br transition-all duration-300 group-hover:scale-110">
                  <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                </div>
              </div>

              {/* Category Name */}
              <span className="text-secondary group-hover:text-primary text-sm font-medium transition-colors duration-300">
                {category.name}
              </span>

              {/* Subtle Indicator */}
              <div className="bg-primary/0 group-hover:bg-primary/30 mt-2 h-0.5 w-6 rounded-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="relative mt-12 text-center md:mt-16">
          {/* Decorative Line */}
          <div className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2">
            <div className="border-primary/20 h-full w-full rounded-tl-2xl border-t-2 border-l-2" />
          </div>

          <p className="text-secondary/70 border-secondary/10 mx-auto inline-flex max-w-2xl items-center gap-3 rounded-full border bg-white/50 px-6 py-4 text-base shadow-sm backdrop-blur-sm md:text-lg">
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            {footerText}
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          </p>
        </div>

        {/* Bottom Decorative Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {[1, 2, 3, 2, 1].map((size, index) => (
            <div
              key={index}
              className={`bg-primary/20 hover:bg-primary/40 rounded-full transition-all duration-300`}
              style={{
                width: `${size * 4}px`,
                height: `${size * 4}px`,
                animationDelay: `${index * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
