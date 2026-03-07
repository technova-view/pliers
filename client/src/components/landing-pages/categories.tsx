import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react";

interface CategoriesProps {
  title?: string;
  categories?: string[];
  finalText?: string;
}

export function Categories({
  title = "Now Accepting Contractors In:",
  categories = [
    "Plumbing",
    "Electrical",
    "Geysers & Hot Water",
    "Appliance Repair",
    "Handyman Services",
  ],
  finalText = "More categories launching soon.",
}: CategoriesProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Title */}
          <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-left bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <Wrench className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-secondary/80 text-base font-medium">
                  {category}
                </p>
              </div>
            ))}
          </div>

          {/* Final Text */}
          <p className="text-secondary/70 text-base md:text-lg">
            {finalText}
          </p>
        </div>
      </div>
    </section>
  );
}
