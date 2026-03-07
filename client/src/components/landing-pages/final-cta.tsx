import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCtaProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const FinalCta = ({
  title = "Ready to Solve Your Home Problem?",
  subtitle = "Start chatting with our AI assistant now – it's free and takes less than a minute.",
  buttonText = "Start Free Diagnosis",
  onButtonClick,
}: FinalCtaProps) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center space-y-5">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-base text-secondary/60 max-w-lg mx-auto">
            {subtitle}
          </p>

          {/* CTA Button */}
          <div className="pt-3">
            <Button
              size="lg"
              className="group px-8 py-6 text-sm font-bold tracking-widest uppercase bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-md"
              onClick={onButtonClick}
            >
              <span className="flex items-center gap-2">
                {buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
