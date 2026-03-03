import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Hero } from "@/components/landing-pages/hero";
import { HowItWorks } from "@/components/landing-pages/how-it-works";
import { BuiltForRealHomes } from "@/components/landing-pages/built-for-real-homes";
import { BuiltForSouthAfricanHomes } from "@/components/landing-pages/built-for-south-african-homes";
import { FAQ } from "@/components/landing-pages/faq";
import { FinalCta } from "@/components/landing-pages/final-cta";
import { BadgeCheck, Bot, Shield, Wrench } from "lucide-react";
import { homeownerLandingPageData } from "../data/homeowner-landing-page/data";
import { UserType } from "@/lib/enums";

export default function LandingPage() {
  // Convert how it works features icons
  const howItWorksData = {
    ...homeownerLandingPageData.howItWorks,
    features: homeownerLandingPageData.howItWorks.features?.map(
      (feature) => ({
        ...feature,
        icon: feature.icon === "Bot" ? (
          <Bot className="w-10 h-10 text-primary" strokeWidth={1.5} />
        ) : feature.icon === "Wrench" ? (
          <Wrench className="w-10 h-10 text-primary" strokeWidth={1.5} />
        ) : feature.icon === "BadgeCheck" ? (
          <BadgeCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
        ) : feature.icon === "Shield" ? (
          <Shield className="w-10 h-10 text-primary" strokeWidth={1.5} />
        ) : null,
      }),
    ),
  };

  return (
    <div className="font-primary flex min-h-screen flex-col">
      <Header userType={UserType.HOME_OWNER} />
      <Hero {...homeownerLandingPageData.hero} />
      <HowItWorks {...howItWorksData} />
      <BuiltForRealHomes {...homeownerLandingPageData.builtForRealHomes} />
      {/* <BuiltForSouthAfricanHomes
        {...homeownerLandingPageData.builtForSouthAfricanHomes}
      /> */}
      <FAQ {...homeownerLandingPageData.faq} />
      <FinalCta />
      <Separator />
      <Footer />
    </div>
  );
}
