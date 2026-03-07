import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface LeadQualityProps {
  title?: string;
  description?: string;
  features?: string[];
  finalText?: string;
}

export function LeadQuality({
  title = "Better Information = Better Jobs",
  description = "Every lead includes:",
  features = [
    "Problem description",
    "Property type",
    "Location",
    "Urgency level",
    "Supporting details (where available)",
  ],
  finalText = "Less back-and-forth. More productive conversations.",
}: LeadQualityProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Title */}
          <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          {/* Description */}
          <p className="text-secondary/70 text-base leading-relaxed md:text-lg">
            {description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-left bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-secondary/80 text-base">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Final Text */}
          <p className="text-secondary font-semibold text-lg md:text-xl">
            {finalText}
          </p>
        </div>
      </div>
    </section>
  );
}
