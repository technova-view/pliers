import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { AboutPliers } from "@/components/landing-pages/about-pliers";
import { Home, Users, Zap } from "lucide-react";
import { homeownerLandingPageData } from "@/data/homeowner-landing-page/data";
import { UserType } from "@/lib/enums";

export default function AboutPage() {
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
      <AboutPliers  />
      <Separator />
      <Footer />
    </div>
  );
}
