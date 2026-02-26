import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Hero } from "@/components/landing-pages/hero";
import { HowItWorks } from "@/components/landing-pages/how-it-works";
import { BuiltForRealHomes } from "@/components/landing-pages/built-for-real-homes";
import { BuiltForSouthAfricanHomes } from "@/components/landing-pages/built-for-south-african-homes";
import { AboutPliers } from "@/components/landing-pages/about-pliers";
import { FAQ } from "@/components/landing-pages/faq";
import { Home, Users, Zap } from "lucide-react";
import { homeownerLandingPageData } from "../data/homeowner-landing-page/data";

export default function LandingPage() {
  // Convert icon strings to actual components
  const aboutPliersData = {
    ...homeownerLandingPageData.aboutPliers,
    forWhoItems: homeownerLandingPageData.aboutPliers.forWhoItems?.map(
      (item) => ({
        ...item,
        icon: item.icon === "Home" ? Home : item.icon === "Users" ? Users : Zap,
      }),
    ),
  };

  return (
    <div className="font-primary flex min-h-screen flex-col">
      <Header />
      <Hero {...homeownerLandingPageData.hero} />
      <HowItWorks {...homeownerLandingPageData.howItWorks} />
      <BuiltForRealHomes {...homeownerLandingPageData.builtForRealHomes} />
      <BuiltForSouthAfricanHomes
        {...homeownerLandingPageData.builtForSouthAfricanHomes}
      />
      <AboutPliers {...aboutPliersData} />
      <FAQ {...homeownerLandingPageData.faq} />
      <Separator />
      <Footer />
    </div>
  );
}
