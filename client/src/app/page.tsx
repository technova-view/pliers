import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
	ArrowRight,
	Zap,
	Droplets,
	ZapOff,
	Flame,
	Thermometer,
	Lock,
	Wrench,
	Home,
	Shield,
	Users,
	MessageCircle,
	AlertTriangle,
	CheckCircle,
	Sparkles,
	Phone,
	Search,
	Menu,
} from "lucide-react";

export default function LandingPage() {
	const problems = [
		{ icon: <Droplets className="w-5 h-5" />, text: "My geyser is leaking." },
		{ icon: <ZapOff className="w-5 h-5" />, text: "My power keeps tripping." },
		{
			icon: <Flame className="w-5 h-5" />,
			text: "There's a strange smell in the kitchen.",
		},
	];

	const categories = [
		{ icon: <Droplets className="w-6 h-6" />, name: "Plumbing leaks" },
		{ icon: <Zap className="w-6 h-6" />, name: "Electrical faults" },
		{ icon: <Thermometer className="w-6 h-6" />, name: "Geyser problems" },
		{ icon: <Wrench className="w-6 h-6" />, name: "Appliance breakdowns" },
		{ icon: <Lock className="w-6 h-6" />, name: "Security issues" },
	];

	const homeownerFaqs = [
		{
			q: "1. What is Pliers?",
			a: "Pliers is a home problem-solving platform. You describe what's going wrong in your home — in plain language — and Pliers helps you understand what might be happening, whether it's urgent, and what to do next. If you need professional help, we can connect you to contractors in your area.",
		},
		{
			q: "2. Is Pliers just another directory?",
			a: "No. Pliers doesn't just list contractors. It first helps you understand the problem. We guide you through what could be causing it and whether it's safe to try fixing it yourself before connecting you to a professional. It's about clarity first — then action.",
		},
		{
			q: "3. Is this the same as using ChatGPT?",
			a: "Not quite. ChatGPT gives general information. Pliers is built specifically for home issues. We ask follow-up questions relevant to your situation, highlight safety risks, help decide between DIY and professional help, and connect you to local contractors if needed. It's designed to help you move from 'What's wrong?' to 'It's fixed.'",
		},
		{
			q: "4. Does Pliers replace a professional?",
			a: "No. Pliers provides guidance to help you understand what might be happening. For complex or potentially unsafe issues, we recommend consulting a qualified professional. If needed, we can help you connect with one.",
		},
		{
			q: "5. Is it safe to follow the advice?",
			a: "Pliers is designed to avoid risky or dangerous DIY recommendations. If something appears unsafe, we will advise you to stop and consult a professional. When in doubt, safety comes first.",
		},
		{
			q: "6. Do I have to hire a contractor through Pliers?",
			a: "No. You can use Pliers simply to understand your issue. If you decide you need help, you can choose whether or not to connect with a contractor.",
		},
		{
			q: "7. How much does it cost to use Pliers?",
			a: "For homeowners, using Pliers to understand your problem is free. If you choose to hire a contractor, pricing will depend on the service provider and the work required.",
		},
		{
			q: "8. How do I know the contractors are legitimate?",
			a: "Contractors on Pliers go through a basic approval process before being listed. We aim to connect you with professionals who operate in your area and category. We encourage homeowners to review credentials, ask questions, and confirm details before hiring.",
		},
		{
			q: "9. Can I upload photos of the problem?",
			a: "Yes. Uploading photos can help provide better guidance and clearer job briefs for contractors.",
		},
		{
			q: "10. What types of home problems does Pliers cover?",
			a: "Pliers supports common household issues such as plumbing, electrical, geysers and hot water systems, appliance breakdowns, security and access issues, and general repairs. More categories will be added over time.",
		},
		{
			q: "11. Is my information private?",
			a: "Yes. Your information is only used to help diagnose your issue and, if requested, to connect you with contractors. We do not sell your personal information.",
		},
		{
			q: "12. What areas does Pliers operate in?",
			a: "Pliers is currently focused on South Africa and will expand to additional areas over time.",
		},
	];

	const contractorFaqs = [
		{
			q: "13. How does Pliers work for contractors?",
			a: "Homeowners describe their problems. Pliers helps generate a structured job brief. Contractors can view available leads in their category and area and choose whether to unlock the job details.",
		},
		{
			q: "14. Do contractors pay to join?",
			a: "No subscription is required to join at this stage. Contractors pay per lead when they choose to access job details.",
		},
		{
			q: "15. Are leads exclusive?",
			a: "Some leads may be shared with multiple contractors, while others may be offered as exclusive. Details will be visible before purchasing.",
		},
		{
			q: "16. How are leads priced?",
			a: "Lead pricing varies depending on category, urgency, and job type. Contractors only pay if they choose to access a lead.",
		},
		{
			q: "17. Is there a contract or minimum spend?",
			a: "No long-term contracts. Contractors decide when and how often to purchase leads.",
		},
	];

	return (
		<div className="flex flex-col min-h-screen font-primary">
			<Header />

			{/* Hero Section */}
			<section className="relative min-h-[20vh] flex items-center justify-center overflow-hidden">
				{/* Background Image with Overlay */}
				<div className="absolute inset-0 z-0">
					<Image
						src="/homePageImage.jpg" // Add your background image to public folder
						alt="Home interior background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90 bg-grid-pattern" />
				</div>

				{/* Content */}
				<div className="relative z-10 container max-w-6xl mx-auto px-4 py-20 md:py-32">
					<div className="max-w-3xl mx-auto text-center space-y-8">
						{/* Badge */}
						<Badge
							variant="outline"
							className="px-4 py-2 border-primary/20 bg-background/50 backdrop-blur-sm text-foreground/90"
						>
							<Home className="w-4 h-4 mr-2 text-primary" />
							PLIERS
						</Badge>

						{/* Main Heading */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
							Something wrong at home?<br />
							<span className="text-primary">Let's fix it.</span>
						</h1>

						{/* Description */}
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Describe the problem in plain language. Pliers helps you understand
							what's happening, what to do next, and connects you to trusted local
							professionals if you need them.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
							<Button
								size="lg"
								className="group px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Explain My Problem
								<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="px-8 py-6 text-base bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 transition-all duration-300"
							>
								Find a Contractor
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-16 bg-muted/30">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center mb-12">
						<Badge variant="outline" className="mb-4">
							Simple Process
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{/* Step 1 */}
						<Card className="border-0 shadow-sm">
							<CardContent className="p-6">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="text-2xl">1️⃣</span>
								</div>
								<h3 className="text-xl font-semibold mb-4">
									Tell us what's happening
								</h3>
								<div className="space-y-2 mb-4">
									{problems.map((problem, index) => (
										<div
											key={index}
											className="flex items-center gap-2 text-muted-foreground"
										>
											{problem.icon}
											<span className="text-sm">"{problem.text}"</span>
										</div>
									))}
								</div>
								<p className="text-sm text-muted-foreground italic">
									No technical knowledge needed.
								</p>
							</CardContent>
						</Card>

						{/* Step 2 */}
						<Card className="border-0 shadow-sm">
							<CardContent className="p-6">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="text-2xl">2️⃣</span>
								</div>
								<h3 className="text-xl font-semibold mb-4">Get clear guidance</h3>
								<p className="text-sm text-muted-foreground mb-4">
									Pliers asks a few smart questions and explains:
								</p>
								<ul className="space-y-2">
									{[
										"What might be causing it",
										"Whether it's urgent",
										"What you should (and shouldn't) do",
										"If it's safe to try fixing it yourself",
									].map((item, index) => (
										<li key={index} className="flex items-start gap-2 text-sm">
											<CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{/* Step 3 */}
						<Card className="border-0 shadow-sm">
							<CardContent className="p-6">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="text-2xl">3️⃣</span>
								</div>
								<h3 className="text-xl font-semibold mb-4">Get it sorted</h3>
								<p className="text-sm text-muted-foreground mb-4">
									If you need help, Pliers generates a clear job brief and connects
									you to local professionals near you.
								</p>
								<p className="text-sm font-medium text-primary">
									No confusion. No guessing. No endless searching.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Why Pliers */}
			<section className="py-16">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<Badge variant="outline">Why Pliers?</Badge>
							<h2 className="text-3xl md:text-4xl font-bold">
								Why Not Just Google or ChatGPT?
							</h2>
							<p className="text-xl text-muted-foreground">
								Because advice alone doesn't fix the problem.
							</p>

							<div className="space-y-3">
								{[
									"Asks follow-up questions specific to home issues",
									"Flags safety risks automatically",
									"Helps you decide between DIY or professional help",
									"Connects you directly to local contractors",
								].map((item, index) => (
									<div key={index} className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
										<span>{item}</span>
									</div>
								))}
							</div>

							<div className="p-6 bg-muted/30 rounded-lg border">
								<p className="text-muted-foreground mb-2">
									ChatGPT gives information.
								</p>
								<p className="text-lg font-semibold text-primary">
									Pliers helps you take action.
								</p>
							</div>
						</div>

						<Card className="border shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
										<MessageCircle className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold">Pliers AI Assistant</h3>
										<p className="text-xs text-muted-foreground">
											Understanding your problem...
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="bg-muted/50 rounded-lg p-4">
										<p className="text-xs font-medium mb-1 text-muted-foreground">
											You:
										</p>
										<p className="text-sm">"My geyser is leaking from the bottom"</p>
									</div>
									<div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
										<p className="text-xs font-medium mb-1 text-primary">
											Pliers:
										</p>
										<p className="text-sm mb-2">
											⚠️ This could be a pressure valve issue or a tank leak. If
											it's the tank, it needs immediate professional attention.
										</p>
										<p className="text-sm text-muted-foreground">
											Turn off the power supply and water inlet. Don't attempt to
											repair a tank leak yourself.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Built for Real Homes */}
			<section className="py-16 bg-muted/30">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="text-center mb-12">
						<Badge variant="outline" className="mb-4">
							Built for You
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold mb-2">
							Built for Real Homes
						</h2>
						<p className="text-lg text-muted-foreground">Whether it's:</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
						{categories.map((category, index) => (
							<div
								key={index}
								className="flex flex-col items-center text-center p-4 bg-background rounded-lg border hover:border-primary transition-colors"
							>
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
									{category.icon}
								</div>
								<span className="text-sm font-medium">{category.name}</span>
							</div>
						))}
					</div>

					<p className="text-center text-muted-foreground mt-8">
						Pliers is designed for everyday home problems.
					</p>
				</div>
			</section>

			{/* Safety Section */}
			<section className="py-16">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<Badge variant="outline">🛡️ Designed for Safety</Badge>
							<h2 className="text-3xl md:text-4xl font-bold">
								We prioritise your safety
							</h2>
							<p className="text-lg text-muted-foreground">
								Clear warnings, no risky DIY advice, and professional escalation
								when necessary. Because some problems shouldn't be guessed.
							</p>
						</div>

						<Card className="border-2 border-yellow-500/20 bg-yellow-500/5">
							<CardContent className="p-8">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
										<Shield className="w-6 h-6 text-yellow-600" />
									</div>
									<h3 className="text-xl font-semibold">Safety First Approach</h3>
								</div>
								<div className="space-y-3">
									{[
										"Clear warnings where needed",
										"No risky DIY advice",
										"Professional escalation when necessary",
									].map((item, index) => (
										<div key={index} className="flex items-start gap-3">
											<AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
											<p className="text-sm">{item}</p>
										</div>
									))}
								</div>
								<p className="mt-6 text-sm text-muted-foreground italic">
									Because some problems shouldn't be guessed.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* For When You Need a Pro */}
			<section className="py-16 bg-muted/30">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<Badge variant="outline">👷 For Professionals</Badge>
							<h2 className="text-3xl md:text-4xl font-bold">
								For When You Need a Pro
							</h2>
							<p className="text-lg text-muted-foreground">
								Not the DIY type? No problem.
							</p>

							<div className="space-y-3">
								{[
									'Generate a structured job brief',
									'Match you with contractors in your area',
									'Help you move from "What\'s wrong?" to "It\'s fixed."',
								].map((item, index) => (
									<div key={index} className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>

						<Card className="border shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
										<Wrench className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold">Job Brief Example</h3>
										<p className="text-xs text-muted-foreground">
											Generated by Pliers
										</p>
									</div>
								</div>
								<div className="space-y-3 text-sm">
									<div className="grid grid-cols-2 gap-2">
										<span className="text-muted-foreground">Issue:</span>
										<span className="font-medium">Geyser leaking</span>
										<span className="text-muted-foreground">Urgency:</span>
										<span className="font-medium text-orange-600">High</span>
										<span className="text-muted-foreground">Location:</span>
										<span className="font-medium">Cape Town</span>
										<span className="text-muted-foreground">Access:</span>
										<span className="font-medium">Roof space</span>
									</div>
									<Separator />
									<p className="text-muted-foreground text-xs">
										Photos attached: 3 • Safety: Power off required
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Built for South African Homes */}
			<section className="py-16">
				<div className="container max-w-3xl mx-auto px-4 text-center space-y-6">
					<Badge variant="outline">🌍 Local Focus</Badge>
					<h2 className="text-3xl md:text-4xl font-bold">
						Built for South African Homes
					</h2>
					<p className="text-lg text-muted-foreground">
						We understand local housing realities, common infrastructure issues,
						and the way South Africans describe home problems.
					</p>
					<div className="p-6 bg-muted/30 rounded-lg border">
						<p className="text-xl font-medium text-primary">
							This isn't generic advice.
						</p>
						<p className="text-lg">It's built for where you live.</p>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-16 bg-primary text-primary-foreground">
				<div className="container max-w-2xl mx-auto px-4 text-center space-y-6">
					<h2 className="text-3xl md:text-4xl font-bold">Let's fix what's wrong.</h2>
					<p className="text-xl opacity-90">Start by telling us what's happening.</p>
					<Button size="lg" variant="secondary" className="px-8 py-6 text-base">
						Explain My Problem Now
						<ArrowRight className="ml-2 w-4 h-4" />
					</Button>
				</div>
			</section>

			{/* About Pliers */}
			<section className="py-16">
				<div className="container max-w-3xl mx-auto px-4">
					<div className="space-y-12">
						<div className="text-center">
							<h2 className="text-3xl font-bold mb-2">🏠 About Pliers</h2>
							<p className="text-xl text-primary">Every home problem, solved.</p>
						</div>

						<div className="space-y-4 text-muted-foreground">
							<p>
								Homes are meant to feel safe. But when something goes wrong — a
								leaking pipe, a power failure, a broken appliance — that feeling
								disappears quickly. Suddenly you're searching online, calling people
								who don't answer, trying to figure out what's urgent and what's not.
							</p>
							<p className="font-medium text-foreground">
								It's stressful. It's confusing. And it shouldn't be.
							</p>
							<p>Pliers was created to change that.</p>
						</div>

						<Separator />

						<div className="space-y-4">
							<h3 className="text-2xl font-semibold">Why We Built Pliers</h3>
							<p className="text-muted-foreground">
								Most homeowners don't need technical knowledge. They just need
								clarity:
							</p>
							<div className="grid sm:grid-cols-2 gap-3">
								{[
									"What's happening?",
									"Is it dangerous?",
									"Can I fix this myself?",
									"If not, who can I trust?",
								].map((question, index) => (
									<div
										key={index}
										className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg"
									>
										<span className="text-primary">•</span>
										<span>{question}</span>
									</div>
								))}
							</div>
							<p className="text-muted-foreground">
								Right now, the options are scattered. Search engines give generic
								answers. Directories list hundreds of contractors with no context.
								And advice doesn't always translate into action.
							</p>
							<p className="font-medium">
								Pliers brings everything into one place. We combine intelligent
								guidance with real-world solutions — helping you move from confusion
								to confidence in minutes.
							</p>
						</div>

						<Separator />

						<div className="space-y-4">
							<h3 className="text-2xl font-semibold">What Makes Pliers Different</h3>
							<p className="text-muted-foreground">
								Pliers isn't just a directory. It's built around a simple idea:
							</p>
							<p className="text-xl text-primary font-medium text-center py-4">
								Understanding comes first. Action follows.
							</p>
							<p className="text-muted-foreground">
								When you describe a problem, Pliers:
							</p>
							<ul className="space-y-2">
								{[
									"Asks smart follow-up questions",
									"Helps you understand possible causes",
									"Flags safety concerns",
									"Suggests whether DIY is appropriate",
									"Connects you with local professionals if needed",
								].map((item, index) => (
									<li key={index} className="flex items-start gap-2">
										<CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
										<span>{item}</span>
									</li>
								))}
							</ul>
							<p className="text-muted-foreground italic">
								It's not about overwhelming you with information. It's about helping
								you make the right next move.
							</p>
						</div>

						<Separator />

						<div className="space-y-4">
							<h3 className="text-2xl font-semibold">
								For Homeowners. For Professionals.
							</h3>
							<p className="text-muted-foreground">
								Pliers also supports skilled contractors by connecting them with
								well-structured, clearly described jobs.
							</p>
							<p className="text-muted-foreground">
								When everyone has better information:
							</p>
							<div className="grid sm:grid-cols-3 gap-4 text-center">
								{[
									{
										icon: Home,
										text: "Homeowners feel more confident",
									},
									{
										icon: Users,
										text: "Professionals waste less time",
									},
									{
										icon: Zap,
										text: "Problems get solved faster",
									},
								].map((item, index) => {
									const Icon = item.icon;
									return (
										<div key={index} className="p-4 bg-muted/30 rounded-lg">
											<Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
											<p className="font-medium text-sm">{item.text}</p>
										</div>
									);
								})}
							</div>
							<p className="text-center font-medium">That's better for everyone.</p>
						</div>

						<Separator />

						<div className="space-y-4 text-center">
							<h3 className="text-2xl font-semibold">Our Vision</h3>
							<p className="text-muted-foreground">
								We believe every home deserves:
							</p>
							<div className="flex flex-wrap justify-center gap-3">
								{["Clear guidance", "Safe solutions", "Trusted professionals"].map(
									(item, index) => (
										<Badge key={index} variant="secondary" className="px-4 py-2">
											{item}
										</Badge>
									)
								)}
							</div>
							<p className="text-muted-foreground">
								Pliers is building a future where home care is simpler, smarter, and
								less stressful.
							</p>
							<p className="text-xl font-medium text-primary">
								Because when your home works, life works better.
							</p>
						</div>

						<div className="text-center pt-8">
							<h3 className="text-2xl font-semibold mb-4">Let's Fix What's Wrong</h3>
							<p className="text-muted-foreground mb-6">
								Whether it's something small or something urgent, start by telling us
								what's happening. We'll take it from there.
							</p>
							<Button size="lg" className="px-8">
								Explain My Problem →
								<ArrowRight className="ml-2 w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 bg-muted/30">
				<div className="container max-w-3xl mx-auto px-4">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold mb-2">
							❓ Frequently Asked Questions
						</h2>
						<p className="text-muted-foreground">For Homeowners</p>
					</div>

					<Accordion type="single" collapsible className="space-y-3">
						{homeownerFaqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="bg-background rounded-lg border"
							>
								<AccordionTrigger className="px-4 font-medium hover:no-underline">
									{faq.q}
								</AccordionTrigger>
								<AccordionContent className="px-4 pb-4 text-muted-foreground">
									{faq.a}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>

					<div className="mt-12">
						<h3 className="text-2xl font-bold mb-6 text-center">
							👷 For Contractors
						</h3>
						<Accordion type="single" collapsible className="space-y-3">
							{contractorFaqs.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`contractor-${index}`}
									className="bg-background rounded-lg border"
								>
									<AccordionTrigger className="px-4 font-medium hover:no-underline">
										{faq.q}
									</AccordionTrigger>
									<AccordionContent className="px-4 pb-4 text-muted-foreground">
										{faq.a}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					<div className="mt-12 text-center p-8 bg-background rounded-lg border">
						<h3 className="text-2xl font-semibold mb-4">🛠 Still Have Questions?</h3>
						<p className="text-muted-foreground mb-6">
							If you're unsure about anything, feel free to reach out. We're building
							Pliers to make home care simpler — and we're always improving.
						</p>
						<Button variant="outline" size="lg">
							Contact Us
						</Button>
					</div>
				</div>
			</section>

			<Separator />
			<Footer />
		</div>
	);
}
