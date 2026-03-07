import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

interface Step {
  number: number;
  title: string;
  description?: string;
}

interface HowItWorksProps {
  title?: string;
  badgeText?: string;
  steps?: Step[];
  onCtaClick?: () => void;
}

export function HowItWorksForContractors({
  title = "How Pliers Works for Contractors",
  steps = [
    {
      number: 1,
      title: "Homeowners describe their problem",
      description: "Our system helps them clarify the issue and generates a structured job brief.",
    },
    {
      number: 2,
      title: "You receive relevant leads in your area and category",
      description: "See the job type, location, and summary before deciding.",
    },
    {
      number: 3,
      title: "Unlock the lead",
      description: "Contact the homeowner directly and secure the job.",
    },
  ],
  onCtaClick,
}: HowItWorksProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="space-y-12 md:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-primary/20 mx-auto rounded-full" />
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="border border-secondary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  {/* Step number with separator */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm group-hover:bg-primary/20 transition-colors">
                      {step.number}
                    </div>
                    <Separator className="flex-1 bg-secondary/10" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-secondary/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center space-y-6 pt-8">
            <div className="w-16 h-px bg-border mx-auto" />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Ready to Get More Jobs?
              </h3>
              <p className="text-muted-foreground">
                Set up your profile in minutes and start receiving quality leads in your area.
              </p>
            </div>
            <Button
              size="lg"
              className="group px-8 py-5 text-base font-medium shadow-sm hover:shadow transition-all duration-200"
              onClick={onCtaClick}
            >
              Create Your Contractor Profile
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
