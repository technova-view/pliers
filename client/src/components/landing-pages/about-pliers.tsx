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
  title = "About Pliers",
  subtitle = "Every home problem, solved.",
  story = [
    "Homes are meant to feel safe. But when something goes wrong — a leaking pipe, a power failure, a broken appliance — that feeling disappears quickly. Suddenly you're searching online, calling people who don't answer, trying to figure out what's urgent and what's not.",
    "It's stressful. It's confusing. And it shouldn't be.",
    "Pliers was created to change that.",
  ],
  whyWeBuilt = [
    "What's happening?",
    "Is it dangerous?",
    "Can I fix this myself?",
    "If not, who can I trust?",
  ],
  differenceItems = [
    "Asks smart follow-up questions",
    "Helps you understand possible causes",
    "Flags safety concerns",
    "Suggests whether DIY is appropriate",
    "Connects you with local professionals if needed",
  ],
  forWhoItems = [
    { icon: Home, title: "Homeowners", text: "feel more confident" },
    { icon: Users, title: "Professionals", text: "waste less time" },
    { icon: Zap, title: "Problems", text: "get solved faster" },
  ],
  visionItems = ["Clear guidance", "Safe solutions", "Trusted professionals"],
  finalCtaText = "Explain My Problem",
  onFinalCtaClick,
}: AboutPliersProps) {
  return (
    <section className="py-16 md:py-20 bg-linear-to-b from-white to-secondary/5">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-12 md:space-y-16">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-2">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
              {title}
            </h2>
            <p className="text-base text-primary">
              {subtitle}
            </p>
            <div className="w-20 h-1 bg-primary/20 mx-auto rounded-full" />
          </div>

          {/* Story Section */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {story.map((paragraph, index) => (
              <p
                key={index}
                className={`text-secondary/70 leading-relaxed ${
                  index === 1
                    ? "font-medium text-secondary text-lg border-l-4 border-primary pl-4 py-1 bg-primary/5 rounded-r-lg"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="max-w-md mx-auto bg-secondary/10" />

          {/* Why We Built Pliers */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2 text-secondary">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Why We Built Pliers
            </h3>

            <p className="text-secondary/70">
              Most homeowners don't need technical knowledge. They just need clarity:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {whyWeBuilt.map((question, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white border border-secondary/10 rounded-lg hover:border-primary/30 transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-sm">?</span>
                  </div>
                  <span className="font-medium text-secondary">{question}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-primary/5 rounded-lg border border-primary/10">
              <p className="font-medium text-primary">
                Pliers brings everything into one place. We combine intelligent
                guidance with real-world solutions — helping you move from confusion
                to confidence in minutes.
              </p>
            </div>
          </div>

          <Separator className="max-w-md mx-auto bg-secondary/10" />

          {/* What Makes Pliers Different */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2 text-secondary">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              What Makes Pliers Different
            </h3>

            <p className="text-secondary/70">
              Pliers isn't just a directory. It's built around a simple idea:
            </p>

            <div className="relative py-6 px-8 bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20">
              <p className="text-xl md:text-2xl text-primary font-medium text-center">
                "Understanding comes first. Action follows."
              </p>
            </div>

            <p className="text-secondary/70">
              When you describe a problem, Pliers:
            </p>

            <ul className="space-y-3">
              {differenceItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-secondary/70 group-hover:text-secondary transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-secondary/70 italic bg-secondary/5 p-4 rounded-lg border border-secondary/10">
              It's not about overwhelming you with information. It's about helping
              you make the right next move.
            </p>
          </div>

          <Separator className="max-w-md mx-auto bg-secondary/10" />

          {/* For Homeowners. For Professionals. */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2 text-secondary">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              For Homeowners. For Professionals.
            </h3>

            <p className="text-secondary/70">
              Pliers supports skilled contractors by connecting them with
              well-structured, clearly described jobs.
            </p>

            <p className="text-secondary/70">
              When everyone has better information:
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {forWhoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-semibold text-sm mb-1 text-secondary">{item.title}</p>
                      <p className="text-sm text-secondary/60">{item.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="text-center font-medium text-primary bg-primary/5 py-3 rounded-lg">
              That's better for everyone.
            </p>
          </div>

          <Separator className="max-w-md mx-auto bg-secondary/10" />

          {/* Our Vision */}
          <div className="space-y-6 max-w-3xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-secondary">
              Our Vision
            </h3>

            <p className="text-secondary/70">
              We believe every home deserves:
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {visionItems.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-5 py-2 text-sm font-medium bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/15"
                >
                  {item}
                </Badge>
              ))}
            </div>

            <p className="text-secondary/70 max-w-2xl mx-auto">
              Pliers is building a future where home care is simpler, smarter, and
              less stressful.
            </p>

            <div className="relative py-6 px-8">
              <p className="text-xl md:text-2xl font-medium text-primary">
                Because when your home works, life works better.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center pt-8 space-y-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-secondary">
                Let's Fix What's Wrong
              </h3>
              <p className="text-secondary/70">
                Whether it's something small or something urgent, start by telling us
                what's happening. We'll take it from there.
              </p>
            </div>

            <Button
              size="lg"
              className="group px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-white"
              onClick={onFinalCtaClick}
            >
              <span className="flex items-center gap-2">
                {finalCtaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
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
