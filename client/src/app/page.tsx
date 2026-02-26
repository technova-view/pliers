import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Hero } from "@/components/landing-pages/hero";
import { HowItWorks } from "@/components/landing-pages/how-it-works";
import { BuiltForRealHomes } from "@/components/landing-pages/built-for-real-homes";
import { BuiltForSouthAfricanHomes } from "@/components/landing-pages/built-for-south-african-homes";
import { AboutPliers } from "@/components/landing-pages/about-pliers";
import { FAQ } from "@/components/landing-pages/faq";
import { FinalCta } from "@/components/landing-pages/final-cta";
import { Home, Users, Zap } from "lucide-react";
import { homeownerLandingPageData } from "../data/homeowner-landing-page/data";
import { UserType } from "@/lib/enums";

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
      <Header userType={UserType.HOME_OWNER} />
      <Hero {...homeownerLandingPageData.hero} />
      <AboutPliers {...aboutPliersData} />
      <HowItWorks {...homeownerLandingPageData.howItWorks} />
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
