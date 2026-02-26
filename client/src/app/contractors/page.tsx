import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Hero } from "@/components/landing-pages/hero";
import { HowItWorks } from "@/components/landing-pages/how-it-works";
import { AboutPliers } from "@/components/landing-pages/about-pliers";
import { FAQ } from "@/components/landing-pages/faq";
import { contractorLandingPageData } from "@/data/contractor-landing-page/data";

export default function ContractorLandingPage() {
	return (
		<div className="flex flex-col min-h-screen font-primary">
			<Header />
			<Hero {...contractorLandingPageData.hero} />
			<HowItWorks {...contractorLandingPageData.howItWorks} />
			<AboutPliers {...contractorLandingPageData.aboutPliers} />
			<FAQ {...contractorLandingPageData.faq} />
			<Separator />
			<Footer />
		</div>
	);
}
