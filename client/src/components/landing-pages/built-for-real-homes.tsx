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
    <section className="py-16 md:py-20 bg-linear-to-b from-secondary/2 to-secondary/5">
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge
            variant="outline"
            className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 font-medium mb-4 animate-in fade-in slide-in-from-top-4 duration-700"
          >
            {badgeText}
          </Badge>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-secondary animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {title}
          </h2>

          <div className="flex items-center justify-center gap-3 animate-in fade-in duration-700 delay-200">
            <div className="h-px w-8 bg-primary/30" />
            <p className="text-base text-secondary/70">
              {subtitle}
            </p>
            <div className="h-px w-8 bg-primary/30" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 max-w-3xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-4 md:p-5 bg-white rounded-xl border border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon Container with Gradient */}
              <div className="mb-3">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>
              </div>

              {/* Category Name */}
              <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors duration-300">
                {category.name}
              </span>

              {/* Subtle Indicator */}
              <div className="w-6 h-0.5 bg-primary/0 group-hover:bg-primary/30 rounded-full mt-2 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="relative mt-12 md:mt-16 text-center">
          {/* Decorative Line */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12">
            <div className="w-full h-full border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
          </div>

          <p className="text-base md:text-lg text-secondary/70 max-w-2xl mx-auto px-6 py-4 bg-white/50 backdrop-blur-sm rounded-full border border-secondary/10 shadow-sm inline-flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {footerText}
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </p>
        </div>

        {/* Bottom Decorative Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {[1, 2, 3, 2, 1].map((size, index) => (
            <div
              key={index}
              className={`rounded-full bg-primary/20 transition-all duration-300 hover:bg-primary/40`}
              style={{
                width: `${size * 4}px`,
                height: `${size * 4}px`,
                animationDelay: `${index * 100}ms`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
