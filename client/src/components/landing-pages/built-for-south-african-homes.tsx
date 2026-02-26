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
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5 relative overflow-hidden">
      {/* Map Pattern Overlay (subtle) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          color: 'currentColor'
        }} />
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        {/* Main Content Card */}
        <div className="relative animate-in fade-in duration-700">
          {/* Card with Flag Accent - Keeping SA flag colors as they're specific to South Africa */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
            {/* South African Flag Stripe - Preserved as it's culturally significant */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-black via-yellow-500 to-green-600" />

            <CardContent className="p-10 md:p-12 text-center space-y-8">
              {/* Badge with Location Icon */}
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="px-5 py-2 border-primary/20 text-primary bg-primary/5 font-medium inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                  </svg>
                  {badgeText}
                </Badge>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
                Built for <span className="text-primary relative">
                  {title.split(' ').slice(2).join(' ')}
                  <svg className="absolute -bottom-2 left-0 right-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>

              {/* Description */}
              <p className="text-base text-secondary/70 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>

              {/* Highlight Box */}
              <div className="relative p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                {/* Decorative Quote Marks */}
                <div className="absolute -top-3 left-6 text-6xl text-primary/20 font-serif">"</div>

                <div className="relative space-y-3">
                  <p className="text-2xl md:text-3xl font-semibold text-secondary">
                    {highlightQuote}
                  </p>
                  <p className="text-xl md:text-2xl text-secondary/70 font-medium">
                    {highlightSubQuote}
                  </p>
                </div>

                {/* Decorative South African Elements - Preserved as culturally significant */}
                <div className="flex justify-center gap-3 mt-6">
                  <div className="w-2 h-2 rounded-full bg-black/30" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                  <div className="w-2 h-2 rounded-full bg-green-600/30" />
                  <div className="w-2 h-2 rounded-full bg-blue-600/30" />
                  <div className="w-2 h-2 rounded-full bg-red-600/30" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floating Map Pin */}
          <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg border border-primary/20">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
