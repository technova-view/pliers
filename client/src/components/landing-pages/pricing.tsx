import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface PricingProps {
  title?: string;
  features?: string[];
}

export function Pricing({
  title = "Simple, Transparent Pricing",
  features = [
    "No subscriptions",
    "No contracts",
    "No minimum spend",
    "You only pay when you choose to access a lead",
  ],
}: PricingProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Title */}
          <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-left"
              >
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <p className="text-secondary/80 text-lg md:text-xl font-medium">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
