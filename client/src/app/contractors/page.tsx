import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Hero } from "@/components/landing-pages/hero";
import { HowItWorks } from "@/components/landing-pages/how-it-works";
import { WhyDifferent } from "@/components/landing-pages/why-different";
import { LeadQuality } from "@/components/landing-pages/lead-quality";
import { Pricing } from "@/components/landing-pages/pricing";
import { TrustBuilder } from "@/components/landing-pages/trust-builder";
import { Categories } from "@/components/landing-pages/categories";
import { FinalCta } from "@/components/landing-pages/final-cta";
import { FAQ } from "@/components/landing-pages/faq";
import { contractorLandingPageData } from "@/data/contractor-landing-page/data";
import { UserType } from "@/lib/enums";
import { HowItWorksForContractors } from "@/components/landing-pages/how-it-works-for-contractors";

export default function ContractorLandingPage() {
  return (
    <div className="font-primary flex min-h-screen flex-col">
      <Header userType={UserType.CONTRACTOR} />
      <Hero {...contractorLandingPageData.hero} />
      <HowItWorksForContractors {...contractorLandingPageData.howItWorks} />
      <WhyDifferent {...contractorLandingPageData.whyDifferent} />
      <LeadQuality {...contractorLandingPageData.leadQuality} />
      <Pricing {...contractorLandingPageData.pricing} />
      <TrustBuilder {...contractorLandingPageData.trustBuilder} />
      <Categories {...contractorLandingPageData.categories} />
      <FinalCta {...contractorLandingPageData.finalCta} />
      <FAQ {...contractorLandingPageData.faq} />
      <Separator />
      <Footer />
    </div>
  );
}
