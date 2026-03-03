import { Home, Wrench, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AboutPliersProps {
  onCtaClick?: () => void;
}

export function AboutPliers({ onCtaClick }: AboutPliersProps) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-20">
          {/* Header */}
          <div className="text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 mx-auto mb-2">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              About Pliers
            </h2>
            <p className="text-xl text-primary font-medium">
              Every home problem, solved.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 mx-auto rounded-full" />
          </div>

          {/* Intro */}
          <div className="space-y-5 text-slate-600 leading-relaxed max-w-3xl mx-auto">
            <p className="text-justify">
              Homes are meant to feel safe. But when something goes wrong — whether it's a leaking pipe, a power failure, or a broken appliance — that sense of safety can disappear quickly. Suddenly, you find yourself searching online, calling people who don't answer, and trying to figure out what's urgent and what can wait. It's stressful. It's confusing. And it shouldn't be that way.
            </p>
            <div className="flex justify-center">
              <span className="inline-block bg-primary/5 px-6 py-2 rounded-full">
                <p className="text-primary font-semibold text-center">
                  Pliers was created to change that.
                </p>
              </span>
            </div>
          </div>

          {/* Why We Built Pliers */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">Why We Built Pliers</h3>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="text-justify">
                Most homeowners don't need technical knowledge. What they really need is clarity. They want to understand what's happening, whether it's dangerous, whether they can fix it themselves, and, if not, who they can trust to help.
              </p>
              <p className="text-justify">
                Right now, the options are scattered. Search engines provide generic answers. Directories list hundreds of contractors without context. Advice is available, but it doesn't always translate into action. Pliers brings everything into one place — combining intelligent guidance with real-world solutions to help you move from confusion to confidence in minutes.
              </p>
            </div>
          </div>

          {/* What Makes Pliers Different */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">What Makes Pliers Different</h3>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p className="text-justify">
                Pliers isn't just a directory. It's built around a simple idea: understanding comes first, and action follows.
              </p>
              <p className="text-justify">
                When you describe a problem, Pliers asks smart follow-up questions to better understand your situation. It helps you explore possible causes, flags potential safety concerns, and suggests whether a do-it-yourself approach is appropriate. If professional help is needed, it connects you with local service providers in your area.
              </p>
              <p className="text-slate-700 font-medium italic border-l-2 border-primary/30 pl-4 py-1">
                Our goal isn't to overwhelm you with information. It's to help you make the right next move.
              </p>
            </div>
          </div>

          {/* Built for Real Homes */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Built for Real Homes</h3>
              <p className="text-slate-600 leading-relaxed text-justify">
                Pliers is designed with local realities in mind. We understand how people describe home problems, the infrastructure challenges many households face, and the importance of practical, affordable solutions. We are starting in South Africa with a simple mission: to become the most trusted place homeowners turn to when something isn't working.
              </p>
            </div>
          </div>

          {/* For Homeowners & Professionals */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">For Homeowners. For Professionals.</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-justify">
              Pliers also supports skilled contractors by connecting them with well-structured, clearly described job requests. When everyone has better information, homeowners feel more confident, professionals waste less time, and problems get solved faster. That's better for everyone.
            </p>
          </div>

          {/* Our Vision */}
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-primary/40 before:via-primary/60 before:to-primary/40 before:rounded-full">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-justify">
                We believe every home deserves clear guidance, safe solutions, and access to trusted professionals. Pliers is building a future where home care is simpler, smarter, and far less stressful. Because when your home works, life works better.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center space-y-6 pt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 mx-auto rounded-full" />
            <h3 className="text-2xl font-semibold text-slate-900">Let's Fix What's Wrong</h3>
            <p className="text-slate-500">
              Whether it's something small or something urgent, start by telling us what's happening. We'll take it from there.
            </p>
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              onClick={onCtaClick}
            >
              Explain My Problem
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-3 pt-4">
            <div className="w-2 h-2 rounded-full bg-primary/10" />
            <div className="w-2 h-2 rounded-full bg-primary/20" />
            <div className="w-2 h-2 rounded-full bg-primary/30" />
            <div className="w-2 h-2 rounded-full bg-primary/20" />
            <div className="w-2 h-2 rounded-full bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
