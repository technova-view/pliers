import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Home, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AboutPliersProps {
  title?: string;
  subtitle?: string;
  story?: string[];
  whyWeBuilt?: string[];
  differenceItems?: string[];
  forWhoItems?: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    text: string;
  }[];
  visionItems?: string[];
  finalCtaText?: string;
  onFinalCtaClick?: () => void;
}

export function AboutPliers({
  title = " What is Pliers?",
  subtitle = "Pliers is a home problem–solving platform.",
  story = [
    "You describe what's going wrong in your home — in plain language — and Pliers helps you understand what might be happening, whether it's urgent, and what to do next. If you need professional help, we can connect you to contractors in your area.",
  ]
}: AboutPliersProps) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-12 md:space-y-8">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-2">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
              {title}
            </h2>
            <div className="w-20 h-1 bg-primary/20 mx-auto rounded-full" />
          </div>

          {/* Simplified About Content */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-4">
              <p className="text-secondary/70 leading-relaxed text-justify">
                {story}
              </p>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
