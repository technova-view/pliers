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

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  badgeText?: string;
  steps?: Step[];
  features?: Feature[];
}

export function HowItWorks({
  title = "How It Works",

  features = [
    {
      icon: <Bot className="w-10 h-10 text-primary" strokeWidth={1.5} />,
      title: "AI Diagnosis",
      description: "Describe your problem in plain language and get instant expert advice on what's wrong.",
    },
    {
      icon: <Wrench className="w-10 h-10 text-primary" strokeWidth={1.5} />,
      title: "DIY Solutions",
      description: "Get step-by-step guidance for simple fixes you can do yourself safely.",
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />,
      title: "Verified Contractors",
      description: "Connect with qualified local professionals when you need expert help.",
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" strokeWidth={1.5} />,
      title: "Safety First",
      description: "We prioritize your safety with clear warnings and professional recommendations.",
    },
  ],
}: HowItWorksProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto mt-4 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-secondary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-secondary/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
