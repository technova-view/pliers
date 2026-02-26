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
    <section className="to-secondary/5 bg-linear-to-b from-white py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="space-y-12 md:space-y-16">
          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="bg-primary/10 mx-auto mb-2 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
              <Home className="text-primary h-8 w-8" />
            </div>
            <h2 className="text-secondary text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="text-primary text-base">{subtitle}</p>
            <div className="bg-primary/20 mx-auto h-1 w-20 rounded-full" />
          </div>

          {/* Story Section */}
          <div className="mx-auto max-w-3xl space-y-4">
            {story.map((paragraph, index) => (
              <p
                key={index}
                className={`text-secondary/70 leading-relaxed ${
                  index === 1
                    ? "text-secondary border-primary bg-primary/5 rounded-r-lg border-l-4 py-1 pl-4 text-lg font-medium"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="bg-secondary/10 mx-auto max-w-md" />

          {/* Why We Built Pliers */}
          <div className="mx-auto max-w-3xl space-y-6">
            <h3 className="text-secondary flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl">
              <span className="bg-primary h-6 w-1.5 rounded-full" />
              Why We Built Pliers
            </h3>

            <p className="text-secondary/70">
              Most homeowners don't need technical knowledge. They just need
              clarity:
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {whyWeBuilt.map((question, index) => (
                <div
                  key={index}
                  className="border-secondary/10 hover:border-primary/30 group flex items-center gap-3 rounded-lg border bg-white p-4 transition-colors"
                >
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full transition-colors">
                    <span className="text-primary text-sm">?</span>
                  </div>
                  <span className="text-secondary font-medium">{question}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 border-primary/10 rounded-lg border p-5">
              <p className="text-primary font-medium">
                Pliers brings everything into one place. We combine intelligent
                guidance with real-world solutions — helping you move from
                confusion to confidence in minutes.
              </p>
            </div>
          </div>

          <Separator className="bg-secondary/10 mx-auto max-w-md" />

          {/* What Makes Pliers Different */}
          <div className="mx-auto max-w-3xl space-y-6">
            <h3 className="text-secondary flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl">
              <span className="bg-primary h-6 w-1.5 rounded-full" />
              What Makes Pliers Different
            </h3>

            <p className="text-secondary/70">
              Pliers isn't just a directory. It's built around a simple idea:
            </p>

            <div className="from-primary/10 via-primary/5 border-primary/20 relative rounded-xl border bg-linear-to-r to-transparent px-8 py-6">
              <p className="text-primary text-center text-xl font-medium md:text-2xl">
                "Understanding comes first. Action follows."
              </p>
            </div>

            <p className="text-secondary/70">
              When you describe a problem, Pliers:
            </p>

            <ul className="space-y-3">
              {differenceItems.map((item, index) => (
                <li key={index} className="group flex items-start gap-3">
                  <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-secondary/70 group-hover:text-secondary transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-secondary/70 bg-secondary/5 border-secondary/10 rounded-lg border p-4 italic">
              It's not about overwhelming you with information. It's about
              helping you make the right next move.
            </p>
          </div>

          <Separator className="bg-secondary/10 mx-auto max-w-md" />

          {/* For Homeowners. For Professionals. */}
          <div className="mx-auto max-w-3xl space-y-6">
            <h3 className="text-secondary flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl">
              <span className="bg-primary h-6 w-1.5 rounded-full" />
              For Homeowners. For Professionals.
            </h3>

            <p className="text-secondary/70">
              Pliers supports skilled contractors by connecting them with
              well-structured, clearly described jobs.
            </p>

            <p className="text-secondary/70">
              When everyone has better information:
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {forWhoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                        <Icon className="text-primary h-6 w-6" />
                      </div>
                      <p className="text-secondary mb-1 text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="text-secondary/60 text-sm">{item.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="text-primary bg-primary/5 rounded-lg py-3 text-center font-medium">
              That's better for everyone.
            </p>
          </div>

          <Separator className="bg-secondary/10 mx-auto max-w-md" />

          {/* Our Vision */}
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h3 className="text-secondary text-xl font-semibold tracking-tight md:text-2xl">
              Our Vision
            </h3>

            <p className="text-secondary/70">We believe every home deserves:</p>

            <div className="flex flex-wrap justify-center gap-3">
              {visionItems.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/15 px-5 py-2 text-sm font-medium"
                >
                  {item}
                </Badge>
              ))}
            </div>

            <p className="text-secondary/70 mx-auto max-w-2xl">
              Pliers is building a future where home care is simpler, smarter,
              and less stressful.
            </p>

            <div className="relative px-8 py-6">
              <p className="text-primary text-xl font-medium md:text-2xl">
                Because when your home works, life works better.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mx-auto max-w-2xl space-y-6 pt-8 text-center">
            <div className="space-y-3">
              <h3 className="text-secondary text-xl font-semibold tracking-tight md:text-2xl">
                Let's Fix What's Wrong
              </h3>
              <p className="text-secondary/70">
                Whether it's something small or something urgent, start by
                telling us what's happening. We'll take it from there.
              </p>
            </div>

            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 px-8 py-6 text-base text-white shadow-lg transition-all hover:shadow-xl"
              onClick={onFinalCtaClick}
            >
              <span className="flex items-center gap-2">
                {finalCtaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="bg-primary/20 h-1.5 w-1.5 rounded-full" />
            <div className="bg-primary/30 h-1.5 w-1.5 rounded-full" />
            <div className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
            <div className="bg-primary/30 h-1.5 w-1.5 rounded-full" />
            <div className="bg-primary/20 h-1.5 w-1.5 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
