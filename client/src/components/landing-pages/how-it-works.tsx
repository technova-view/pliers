import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Problem {
  icon: React.ReactNode;
  text: string;
}

interface Step {
  number: number;
  emoji: string;
  title: string;
  description?: string;
  problems?: Problem[];
  items?: string[];
  highlightText?: string;
}

interface HowItWorksProps {
  title?: string;
  badgeText?: string;
  steps: Step[];
}

export function HowItWorks({
  title = "How It Works",
  badgeText = "Simple Process",
  steps,
}: HowItWorksProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge
            variant="outline"
            className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 font-medium mb-4"
          >
            {badgeText}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto mt-4 rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-24 left-[18%] right-[18%] h-0.5 bg-linear-to-r from-primary/10 via-primary/40 to-primary/10 rounded-full" />

          {steps.map((step, index) => (
            <Card
              key={index}
              className={`border shadow-md hover:shadow-lg transition-all duration-300 relative bg-white overflow-hidden group ${
                index === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <CardContent className="p-6 md:p-8 relative">
                {/* Step Number with Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                {step.problems && (
                  <div className="space-y-3 mb-4">
                    {step.problems.map((problem, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <div className="text-primary bg-primary/10 p-1.5 rounded-full">
                          {problem.icon}
                        </div>
                        <span className="text-sm text-secondary/70">"{problem.text}"</span>
                      </div>
                    ))}
                  </div>
                )}

                {step.description && (
                  <p className="text-sm text-secondary/70 mb-4">{step.description}</p>
                )}

                {step.items && (
                  <ul className="space-y-3">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group/item">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-secondary/70 group-hover/item:text-secondary transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.highlightText && (
                  <div className="bg-linear-to-r from-primary/10 to-transparent p-4 rounded-lg border-l-4 border-primary mt-4">
                    <p className="text-sm font-medium text-primary">
                      {step.highlightText}
                    </p>
                  </div>
                )}

                {index === 0 && (
                  <p className="text-sm text-secondary/60 italic flex items-center gap-2 mt-4 pt-4 border-t border-secondary/10">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    No technical knowledge needed.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-2 h-2 rounded-full bg-primary/20" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary/20" />
        </div>
      </div>
    </section>
  );
}
