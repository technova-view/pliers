import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface HeroProps {
  badgeText?: string;
  title: {
    text: string;
    span?: ReactNode;
  };
  description: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

export function Hero({
  badgeText = "PLIERS — HOME SERVICES",
  title,
  description,
  primaryCtaText = "Describe Your Problem",
  secondaryCtaText = "Find a Contractor",
  heroImageSrc = "/heroImage.jpeg",
  heroImageAlt = "Modern home interior",
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}: HeroProps) {
  return (
    <section className="relative flex items-center overflow-hidden min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] bg-[#e5ebf2]">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16 lg:py-20">
          {/* Left Content */}
          <div className="space-y-8 md:space-y-10 text-center lg:text-left">
            {/* Badge */}
            <Badge
              variant="outline"
              className="px-5 py-2.5 border-secondary/30 bg-white/10 backdrop-blur-md text-secondary text-sm tracking-wider inline-flex"
            >
              <Home className="w-4 h-4 mr-2 text-secondary" />
              {badgeText}
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-secondary leading-tight">
              {title.text}
              {title.span}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-8 md:pt-10">
              <Button
                size="lg"
                className="group px-8 py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
                onClick={onPrimaryCtaClick}
              >
                {primaryCtaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              {secondaryCtaText && (
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base md:text-lg border-2 border-secondary/30 bg-white/10 backdrop-blur-md text-secondary hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
                  onClick={onSecondaryCtaClick}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Optional subtle overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
