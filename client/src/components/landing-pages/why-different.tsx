import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface WhyDifferentProps {
  title?: string;
  description?: string;
  features?: string[];
  finalText?: string;
}

export function WhyDifferent({
  title = "Not Another Directory",
  description = "Unlike traditional listing sites, Pliers:",
  features = [
    "Screens and structures homeowner requests",
    "Reduces vague “Can you quote?” messages",
    "Focuses on active job intent",
    "Lets you choose which leads to purchase",
  ],
  finalText = "You stay in control.",
}: WhyDifferentProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium text-primary border-primary/20 bg-primary/5 rounded-full"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
          </div>

          {/* Description Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-3xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-left text-gray-700 text-base md:text-lg font-medium leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Final Text with Emphasis */}
          <div className="relative pt-8">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <p className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              {finalText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
