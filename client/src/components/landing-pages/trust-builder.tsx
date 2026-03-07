import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface TrustBuilderProps {
  title?: string;
  description?: string;
  painPoints?: string[];
  finalText?: string;
}

export function TrustBuilder({
  title = "Built for Local Professionals",
  description = "Pliers is designed specifically for home service businesses.",
  painPoints = [
    "The cost of chasing bad leads",
    "The frustration of unpaid quoting",
    "The need for steady work",
  ],
  finalText = "Our goal is simple: Help you spend more time working and less time hunting for jobs.",
}: TrustBuilderProps) {
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

          {/* Pain Points */}
          <div className="space-y-4">
            {painPoints.map((painPoint, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-left"
              >
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-secondary/80 text-base md:text-lg">
                  {painPoint}
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
