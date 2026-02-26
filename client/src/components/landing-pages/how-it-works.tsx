import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Bot, Shield, Wrench } from "lucide-react";

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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Feature 1 - AI Diagnosis */}
          <Card className="border border-secondary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300">
                <Bot className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                  AI Diagnosis
                </h3>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  Describe your problem in plain language and get instant expert advice on what's wrong.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2 - DIY Solutions */}
          <Card className="border border-secondary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300">
                <Wrench className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                  DIY Solutions
                </h3>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  Get step-by-step guidance for simple fixes you can do yourself safely.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3 - Verified Contractors */}
          <Card className="border border-secondary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300">
                <BadgeCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                  Verified Contractors
                </h3>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  Connect with qualified local professionals when you need expert help.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature 4 - Safety First */}
          <Card className="border border-secondary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                  Safety First
                </h3>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  We prioritize your safety with clear warnings and professional recommendations.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
