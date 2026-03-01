import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface HeroProps {
  badgeText?: string;
  title: {
    text: string;
    span: string;
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
    <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-[#e5ebf2] md:min-h-[50vh] lg:min-h-[60vh]">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-8 py-12 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
          {/* Left Content */}
          <div className="order-2 space-y-8 text-center md:space-y-10 lg:order-1 lg:text-left">
            {/* Main Heading */}
            <h1 className="text-secondary text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {title.text}
              <span className="text-primary ml-4">{title.span}</span>
            </h1>

            {/* Description */}
            <p className="text-secondary/80 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl lg:mx-0">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-5 pt-8 sm:flex-row md:pt-10 lg:justify-start">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 px-8 py-6 text-base shadow-lg transition-all duration-300 hover:shadow-xl md:text-lg"
                onClick={onPrimaryCtaClick}
              >
                {primaryCtaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              {secondaryCtaText && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:text-secondary border-2 bg-white/10 px-8 py-6 text-base backdrop-blur-md transition-all duration-300 md:text-lg"
                  onClick={onSecondaryCtaClick}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative order-1 h-50 w-full overflow-hidden rounded-2xl shadow-2xl md:h-100 lg:order-2 lg:h-125">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
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
