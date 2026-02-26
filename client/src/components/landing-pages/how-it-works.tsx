import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { NumberBadge } from "./number-badge";

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
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge
            variant="outline"
            className="border-primary/20 text-primary bg-primary/5 mb-4 px-4 py-1.5 font-medium"
          >
            {badgeText}
          </Badge>
          <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <div className="bg-primary/20 mx-auto mt-4 h-1 w-20 rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="relative grid gap-8 md:grid-cols-3 lg:gap-6">
          {/* Connecting Line (hidden on mobile) */}
          <div className="from-primary/10 via-primary/40 to-primary/10 absolute top-24 right-[18%] left-[18%] hidden h-0.5 rounded-full bg-linear-to-r md:block" />

          {steps.map((step, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border bg-white shadow-md transition-all duration-300 hover:shadow-lg ${
                index === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <CardContent className="relative p-6 md:p-8">
                {/* Step Number with Icon */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center justify-center rounded-2xl">
                    <NumberBadge number={step.number} />
                  </div>
                </div>

                <h3 className="text-secondary group-hover:text-primary mb-4 text-xl font-semibold transition-colors md:text-2xl">
                  {step.title}
                </h3>

                {step.problems && (
                  <div className="mb-4 space-y-3">
                    {step.problems.map((problem, idx) => (
                      <div
                        key={idx}
                        className="hover:bg-primary/5 flex items-center gap-3 rounded-lg p-2 transition-colors"
                      >
                        <div className="text-primary bg-primary/10 rounded-full p-1.5">
                          {problem.icon}
                        </div>
                        <span className="text-secondary/70 text-sm">
                          "{problem.text}"
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {step.description && (
                  <p className="text-secondary/70 mb-4 text-sm">
                    {step.description}
                  </p>
                )}

                {step.items && (
                  <ul className="space-y-3">
                    {step.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="group/item flex items-start gap-3 text-sm"
                      >
                        <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0 transition-transform group-hover/item:scale-110" />
                        <span className="text-secondary/70 group-hover/item:text-secondary transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.highlightText && (
                  <div className="from-primary/10 border-primary mt-4 rounded-lg border-l-4 bg-linear-to-r to-transparent p-4">
                    <p className="text-primary text-sm font-medium">
                      {step.highlightText}
                    </p>
                  </div>
                )}

                {index === 0 && (
                  <p className="text-secondary/60 border-secondary/10 mt-4 flex items-center gap-2 border-t pt-4 text-sm italic">
                    <span className="bg-primary h-1 w-1 rounded-full" />
                    No technical knowledge needed.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="bg-primary/20 h-2 w-2 rounded-full" />
          <div className="bg-primary/40 h-2 w-2 rounded-full" />
          <div className="bg-primary/60 h-2 w-2 rounded-full" />
          <div className="bg-primary/40 h-2 w-2 rounded-full" />
          <div className="bg-primary/20 h-2 w-2 rounded-full" />
        </div>
      </div>
    </section>
  );
}
