import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BuiltForSouthAfricanHomesProps {
  title?: string;
  badgeText?: string;
  description?: string;
  highlightQuote?: string;
  highlightSubQuote?: string;
}

export function BuiltForSouthAfricanHomes({
  title = "Built for South African Homes",
  badgeText = "Local Focus",
  description = "We understand local housing realities, common infrastructure issues, and the way South Africans describe home problems.",
  highlightQuote = "This isn't generic advice.",
  highlightSubQuote = "It's built for where you live.",
}: BuiltForSouthAfricanHomesProps) {
  return (
    <section className="to-secondary/5 relative overflow-hidden bg-linear-to-b from-white py-16 md:py-20">
      {/* Map Pattern Overlay (subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            color: "currentColor",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4">
        {/* Main Content Card */}
        <div className="animate-in fade-in relative duration-700">
          {/* Card with Flag Accent - Keeping SA flag colors as they're specific to South Africa */}
          <Card className="overflow-hidden border-0 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
            {/* South African Flag Stripe - Preserved as it's culturally significant */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-linear-to-r from-black via-yellow-500 to-green-600" />

            <CardContent className="space-y-8 p-10 text-center md:p-12">
              {/* Badge with Location Icon */}
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary bg-primary/5 inline-flex items-center gap-2 px-5 py-2 font-medium"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                  </svg>
                  {badgeText}
                </Badge>
              </div>

              {/* Heading */}
              <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
                Built for{" "}
                <span className="text-primary relative">
                  {title.split(" ").slice(2).join(" ")}
                  <svg
                    className="text-primary/30 absolute right-0 -bottom-2 left-0 h-2 w-full"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q25,0 50,5 T100,5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>

              {/* Description */}
              <p className="text-secondary/70 mx-auto max-w-2xl text-base leading-relaxed">
                {description}
              </p>

              {/* Highlight Box */}
              <div className="from-primary/5 to-primary/10 border-primary/20 relative rounded-2xl border bg-linear-to-br p-8 shadow-inner">
                {/* Decorative Quote Marks */}
                <div className="text-primary/20 absolute -top-3 left-6 font-serif text-6xl">
                  "
                </div>

                <div className="relative space-y-3">
                  <p className="text-secondary text-2xl font-semibold md:text-3xl">
                    {highlightQuote}
                  </p>
                  <p className="text-secondary/70 text-xl font-medium md:text-2xl">
                    {highlightSubQuote}
                  </p>
                </div>

                {/* Decorative South African Elements - Preserved as culturally significant */}
                <div className="mt-6 flex justify-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-black/30" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/30" />
                  <div className="h-2 w-2 rounded-full bg-green-600/30" />
                  <div className="h-2 w-2 rounded-full bg-blue-600/30" />
                  <div className="h-2 w-2 rounded-full bg-red-600/30" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floating Map Pin */}
          <div className="border-primary/20 absolute -top-4 -left-4 rounded-full border bg-white p-3 shadow-lg">
            <svg
              className="text-primary h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
