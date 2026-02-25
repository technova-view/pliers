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
			q: "What is Pliers?",
			a: "Pliers is a home problem-solving platform. You describe what's going wrong in your home — in plain language — and Pliers helps you understand what might be happening, whether it's urgent, and what to do next. If you need professional help, we can connect you to contractors in your area.",
		},
		{
			q: "Is Pliers just another directory?",
			a: "No. Pliers doesn't just list contractors. It first helps you understand the problem. We guide you through what could be causing it and whether it's safe to try fixing it yourself before connecting you to a professional. It's about clarity first — then action.",
		},
		{
			q: "Is this the same as using ChatGPT?",
			a: "Not quite. ChatGPT gives general information. Pliers is built specifically for home issues. We ask follow-up questions relevant to your situation, highlight safety risks, help decide between DIY and professional help, and connect you to local contractors if needed. It's designed to help you move from 'What's wrong?' to 'It's fixed.'",
		},
		{
			q: "Does Pliers replace a professional?",
			a: "No. Pliers provides guidance to help you understand what might be happening. For complex or potentially unsafe issues, we recommend consulting a qualified professional. If needed, we can help you connect with one.",
		},
		{
			q: "Is it safe to follow the advice?",
			a: "Pliers is designed to avoid risky or dangerous DIY recommendations. If something appears unsafe, we will advise you to stop and consult a professional. When in doubt, safety comes first.",
		},
		{
			q: "Do I have to hire a contractor through Pliers?",
			a: "No. You can use Pliers simply to understand your issue. If you decide you need help, you can choose whether or not to connect with a contractor.",
		},
		{
			q: "How much does it cost to use Pliers?",
			a: "For homeowners, using Pliers to understand your problem is free. If you choose to hire a contractor, pricing will depend on the service provider and the work required.",
		},
		{
			q: "How do I know the contractors are legitimate?",
			a: "Contractors on Pliers go through a basic approval process before being listed. We aim to connect you with professionals who operate in your area and category. We encourage homeowners to review credentials, ask questions, and confirm details before hiring.",
		},
		{
			q: "Can I upload photos of the problem?",
			a: "Yes. Uploading photos can help provide better guidance and clearer job briefs for contractors.",
		},
		{
			q: "What types of home problems does Pliers cover?",
			a: "Pliers supports common household issues such as plumbing, electrical, geysers and hot water systems, appliance breakdowns, security and access issues, and general repairs. More categories will be added over time.",
		},
		{
			q: "Is my information private?",
			a: "Yes. Your information is only used to help diagnose your issue and, if requested, to connect you with contractors. We do not sell your personal information.",
		},
		{
			q: "What areas does Pliers operate in?",
			a: "Pliers is currently focused on South Africa and will expand to additional areas over time.",
		},
	];

	const contractorFaqs = [
		{
			q: "How does Pliers work for contractors?",
			a: "Homeowners describe their problems. Pliers helps generate a structured job brief. Contractors can view available leads in their category and area and choose whether to unlock the job details.",
		},
		{
			q: "Do contractors pay to join?",
			a: "No subscription is required to join at this stage. Contractors pay per lead when they choose to access job details.",
		},
		{
			q: "Are leads exclusive?",
			a: "Some leads may be shared with multiple contractors, while others may be offered as exclusive. Details will be visible before purchasing.",
		},
		{
			q: "How are leads priced?",
			a: "Lead pricing varies depending on category, urgency, and job type. Contractors only pay if they choose to access a lead.",
		},
		{
			q: "Is there a contract or minimum spend?",
			a: "No long-term contracts. Contractors decide when and how often to purchase leads.",
		},
	];

	return (
		<div className="flex flex-col min-h-screen font-primary">
			<Header />

			{/* Hero Section */}
			<section className="relative flex items-center overflow-hidden min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] bg-[#e5ebf2]">
				<div className="container max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16 lg:py-20">

						{/* Left Content */}
						<div className="space-y-8 md:space-y-10 text-center lg:text-left">
							{/* Badge */}
							<Badge
								variant="outline"
								className="px-5 py-2.5 border-secondary/30 bg-white/10 backdrop-blur-md text-secondary text-sm tracking-wider inline-flex"
							>
								<Home className="w-4 h-4 mr-2 text-secondary" />
								PLIERS — HOME SERVICES
							</Badge>

							{/* Main Heading */}
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-secondary leading-tight">
								Every home problem, <span className="text-primary">solved.</span>
							</h1>

							{/* Description */}
							<p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
								Your AI-powered home care assistant. Diagnose issues instantly, get DIY solutions, or connect with trusted local contractors in South Africa.
							</p>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-8 md:pt-10">
								<Button
									size="lg"
									className="group px-8 py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
								>
									Describe Your Problem
									<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="px-8 py-6 text-base md:text-lg border-2 border-secondary/30 bg-white/10 backdrop-blur-md text-secondary hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
								>
									Find a Contractor
								</Button>
							</div>
						</div>

						{/* Right Side Image */}
						<div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src="/heroImage.jpeg"
								alt="Modern home interior"
								fill
								className="object-cover hover:scale-105 transition-transform duration-700"
								priority
							/>
							{/* Optional subtle overlay for better text contrast if needed */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-16 md:py-20 bg-white">
				<div className="container max-w-6xl mx-auto px-4">
					{/* Section Header */}
					<div className="text-center mb-12 md:mb-16">
						<Badge
							variant="outline"
							className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 font-medium mb-4"
						>
							Simple Process
						</Badge>
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
							How It Works
						</h2>
						<div className="w-20 h-1 bg-primary/20 mx-auto mt-4 rounded-full" />
					</div>

					{/* Steps Grid */}
					<div className="grid md:grid-cols-3 gap-8 lg:gap-6 relative">
						{/* Connecting Line (hidden on mobile) */}
						<div className="hidden md:block absolute top-24 left-[18%] right-[18%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 rounded-full" />

						{/* Step 1 */}
						<Card className="border  shadow-md hover:shadow-lg transition-all duration-300 relative bg-white overflow-hidden group">
							<CardContent className="p-6 md:p-8 relative">
								{/* Step Number with Icon */}
								<div className="flex items-start justify-between mb-6">
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
										<span className="text-2xl">1️⃣</span>
									</div>
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
										1
									</div>
								</div>

								<h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary group-hover:text-primary transition-colors">
									Tell us what's happening
								</h3>

								{/* Problem Examples */}
								<div className="space-y-3 mb-4">
									{problems.map((problem, index) => (
										<div
											key={index}
											className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
										>
											<div className="text-primary bg-primary/10 p-1.5 rounded-full">
												{problem.icon}
											</div>
											<span className="text-sm text-secondary/70">"{problem.text}"</span>
										</div>
									))}
								</div>

								<p className="text-sm text-secondary/60 italic flex items-center gap-2 mt-4 pt-4 border-t border-secondary/10">
									<span className="w-1 h-1 bg-primary rounded-full" />
									No technical knowledge needed.
								</p>
							</CardContent>
						</Card>

						{/* Step 2 */}
						<Card className="border shadow-md hover:shadow-lg transition-all duration-300 relative bg-white overflow-hidden group md:translate-y-8">
							<CardContent className="p-6 md:p-8 relative">
								<div className="flex items-start justify-between mb-6">
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
										<span className="text-2xl">2️⃣</span>
									</div>
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
										2
									</div>
								</div>

								<h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary group-hover:text-primary transition-colors">
									Get clear guidance
								</h3>

								<p className="text-sm text-secondary/70 mb-4 flex items-center gap-2">
									<span className="w-1.5 h-1.5 bg-primary rounded-full" />
									Pliers asks a few smart questions and explains:
								</p>

								<ul className="space-y-3">
									{[
										"What might be causing it",
										"Whether it's urgent",
										"What you should (and shouldn't) do",
										"If it's safe to try fixing it yourself",
									].map((item, index) => (
										<li key={index} className="flex items-start gap-3 text-sm group/item">
											<CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
											<span className="text-secondary/70 group-hover/item:text-secondary transition-colors">
												{item}
											</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{/* Step 3 */}
						<Card className="border shadow-md hover:shadow-lg transition-all duration-300 relative bg-white overflow-hidden group">
							<CardContent className="p-6 md:p-8 relative">
								<div className="flex items-start justify-between mb-6">
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
										<span className="text-2xl">3️⃣</span>
									</div>
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
										3
									</div>
								</div>

								<h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary group-hover:text-primary transition-colors">
									Get it sorted
								</h3>

								<div className="space-y-4">
									<p className="text-sm text-secondary/70 leading-relaxed">
										If you need help, Pliers generates a clear job brief and connects
										you to local professionals near you.
									</p>

									{/* Highlight Box */}
									<div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border-l-4 border-primary">
										<p className="text-sm font-medium text-primary">
											No confusion. No guessing. No endless searching.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Bottom Decorative Element */}
					<div className="flex justify-center gap-2 mt-12">
						<div className="w-2 h-2 rounded-full bg-primary/20" />
						<div className="w-2 h-2 rounded-full bg-primary/40" />
						<div className="w-2 h-2 rounded-full bg-primary/60" />
						<div className="w-2 h-2 rounded-full bg-primary/40" />
						<div className="w-2 h-2 rounded-full bg-primary/20" />
					</div>
				</div>
			</section>

			{/* Built for Real Homes */}
			<section className="py-16 md:py-20 bg-gradient-to-b from-secondary/2 to-secondary/5">
				<div className="container max-w-6xl mx-auto px-4 relative z-10">
					{/* Section Header */}
					<div className="text-center mb-12 md:mb-16">
						<Badge
							variant="outline"
							className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 font-medium mb-4 animate-in fade-in slide-in-from-top-4 duration-700"
						>
							Built for You
						</Badge>

						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-secondary animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
							Built for Real Homes
						</h2>

						<div className="flex items-center justify-center gap-3 animate-in fade-in duration-700 delay-200">
							<div className="h-px w-8 bg-primary/30" />
							<p className="text-base text-secondary/70">
								Whether it's:
							</p>
							<div className="h-px w-8 bg-primary/30" />
						</div>
					</div>

					{/* Categories Grid */}
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 max-w-3xl mx-auto">
						{categories.map((category, index) => (
							<div
								key={index}
								className="group flex flex-col items-center text-center p-4 md:p-5 bg-white rounded-xl border border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
								style={{ animationDelay: `${300 + index * 100}ms` }}
							>
								{/* Icon Container with Gradient */}
								<div className="mb-3">
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
										<div className="text-primary group-hover:scale-110 transition-transform duration-300">
											{category.icon}
										</div>
									</div>
								</div>

								{/* Category Name */}
								<span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors duration-300">
									{category.name}
								</span>

								{/* Subtle Indicator */}
								<div className="w-6 h-0.5 bg-primary/0 group-hover:bg-primary/30 rounded-full mt-2 transition-all duration-300" />
							</div>
						))}
					</div>

					{/* Footer Message */}
					<div className="relative mt-12 md:mt-16 text-center">
						{/* Decorative Line */}
						<div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12">
							<div className="w-full h-full border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
						</div>

						<p className="text-base md:text-lg text-secondary/70 max-w-2xl mx-auto px-6 py-4 bg-white/50 backdrop-blur-sm rounded-full border border-secondary/10 shadow-sm inline-flex items-center gap-3">
							<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
							Pliers is designed for everyday home problems.
							<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
						</p>
					</div>

					{/* Bottom Decorative Dots */}
					<div className="flex justify-center gap-3 mt-8">
						{[1, 2, 3, 2, 1].map((size, index) => (
							<div
								key={index}
								className={`rounded-full bg-primary/20 transition-all duration-300 hover:bg-primary/40`}
								style={{
									width: `${size * 4}px`,
									height: `${size * 4}px`,
									animationDelay: `${index * 100}ms`
								}}
							/>
						))}
					</div>
				</div>
			</section>



			{/* Built for South African Homes */}
			<section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5 relative overflow-hidden">
				{/* Map Pattern Overlay (subtle) */}
				<div className="absolute inset-0 opacity-5 pointer-events-none">
					<div className="absolute inset-0" style={{
						backgroundImage: `radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)`,
						backgroundSize: '40px 40px',
						color: 'currentColor'
					}} />
				</div>

				<div className="container max-w-4xl mx-auto px-4 relative z-10">
					{/* Main Content Card */}
					<div className="relative animate-in fade-in duration-700">
						{/* Card with Flag Accent - Keeping SA flag colors as they're specific to South Africa */}
						<Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
							{/* South African Flag Stripe - Preserved as it's culturally significant */}
							<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-black via-yellow-500 to-green-600" />

							<CardContent className="p-10 md:p-12 text-center space-y-8">
								{/* Badge with Location Icon */}
								<div className="flex justify-center">
									<Badge
										variant="outline"
										className="px-5 py-2 border-primary/20 text-primary bg-primary/5 font-medium inline-flex items-center gap-2"
									>
										<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
											<circle cx="12" cy="9" r="2.5" fill="currentColor" />
										</svg>
										Local Focus
									</Badge>
								</div>

								{/* Heading */}
								<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
									Built for <span className="text-primary relative">
										South African Homes
										<svg className="absolute -bottom-2 left-0 right-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
											<path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
										</svg>
									</span>
								</h2>

								{/* Description */}
								<p className="text-base text-secondary/70 max-w-2xl mx-auto leading-relaxed">
									We understand local housing realities, common infrastructure issues,
									and the way South Africans describe home problems.
								</p>

								{/* Highlight Box */}
								<div className="relative p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 shadow-inner">
									{/* Decorative Quote Marks */}
									<div className="absolute -top-3 left-6 text-6xl text-primary/20 font-serif">"</div>

									<div className="relative space-y-3">
										<p className="text-2xl md:text-3xl font-semibold text-secondary">
											This isn't generic advice.
										</p>
										<p className="text-xl md:text-2xl text-secondary/70 font-medium">
											It's built for where you live.
										</p>
									</div>

									{/* Decorative South African Elements - Preserved as culturally significant */}
									<div className="flex justify-center gap-3 mt-6">
										<div className="w-2 h-2 rounded-full bg-black/30" />
										<div className="w-2 h-2 rounded-full bg-yellow-500/30" />
										<div className="w-2 h-2 rounded-full bg-green-600/30" />
										<div className="w-2 h-2 rounded-full bg-blue-600/30" />
										<div className="w-2 h-2 rounded-full bg-red-600/30" />
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Floating Map Pin */}
						<div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg border border-primary/20">
							<svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
								<circle cx="12" cy="9" r="2.5" fill="currentColor" />
							</svg>
						</div>
					</div>
				</div>
			</section>



			{/* About Pliers */}
			<section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="space-y-12 md:space-y-16">

						{/* Header */}
						<div className="text-center space-y-3">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-2">
								<Home className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
								About Pliers
							</h2>
							<p className="text-base text-primary">
								Every home problem, solved.
							</p>
							<div className="w-20 h-1 bg-primary/20 mx-auto rounded-full" />
						</div>

						{/* Story Section */}
						<div className="space-y-4 max-w-3xl mx-auto">
							<p className="text-secondary/70 leading-relaxed">
								Homes are meant to feel safe. But when something goes wrong — a
								leaking pipe, a power failure, a broken appliance — that feeling
								disappears quickly. Suddenly you're searching online, calling people
								who don't answer, trying to figure out what's urgent and what's not.
							</p>
							<p className="font-medium text-secondary text-lg border-l-4 border-primary pl-4 py-1 bg-primary/5 rounded-r-lg">
								It's stressful. It's confusing. And it shouldn't be.
							</p>
							<p className="text-secondary/70">Pliers was created to change that.</p>
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
								{[
									"What's happening?",
									"Is it dangerous?",
									"Can I fix this myself?",
									"If not, who can I trust?",
								].map((question, index) => (
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

							<p className="text-secondary/70 leading-relaxed">
								Right now, the options are scattered. Search engines give generic
								answers. Directories list hundreds of contractors with no context.
								And advice doesn't always translate into action.
							</p>

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

							<div className="relative py-6 px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20">
								<p className="text-xl md:text-2xl text-primary font-medium text-center">
									"Understanding comes first. Action follows."
								</p>
							</div>

							<p className="text-secondary/70">
								When you describe a problem, Pliers:
							</p>

							<ul className="space-y-3">
								{[
									"Asks smart follow-up questions",
									"Helps you understand possible causes",
									"Flags safety concerns",
									"Suggests whether DIY is appropriate",
									"Connects you with local professionals if needed",
								].map((item, index) => (
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
								Pliers also supports skilled contractors by connecting them with
								well-structured, clearly described jobs.
							</p>

							<p className="text-secondary/70">
								When everyone has better information:
							</p>

							<div className="grid sm:grid-cols-3 gap-4">
								{[
									{
										icon: Home,
										title: "Homeowners",
										text: "feel more confident",
									},
									{
										icon: Users,
										title: "Professionals",
										text: "waste less time",
									},
									{
										icon: Zap,
										title: "Problems",
										text: "get solved faster",
									},
								].map((item, index) => {
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
								{["Clear guidance", "Safe solutions", "Trusted professionals"].map(
									(item, index) => (
										<Badge
											key={index}
											variant="secondary"
											className="px-5 py-2 text-sm font-medium bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/15"
										>
											{item}
										</Badge>
									)
								)}
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
							>
								<span className="flex items-center gap-2">
									Explain My Problem
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


			{/* FAQ Section */}
			<section className="py-16 md:py-20 bg-white">
				<div className="container max-w-3xl mx-auto px-4">

					{/* Header */}
					<div className="text-center mb-12 space-y-3">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-2">
							<span className="text-2xl">❓</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
							Frequently Asked Questions
						</h2>
						<p className="text-secondary/70 text-base">For Homeowners</p>
						<div className="w-20 h-1 bg-primary/20 mx-auto rounded-full" />
					</div>

					{/* Homeowner FAQs */}
					<Accordion type="single" collapsible className="space-y-4">
						{homeownerFaqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="bg-white rounded-xl border border-secondary/10 hover:border-primary/30 transition-colors data-[state=open]:border-primary/30 data-[state=open]:shadow-sm"
							>
								<AccordionTrigger className="px-6 py-4 font-medium hover:no-underline hover:bg-secondary/5 rounded-t-xl transition-colors group">
									<span className="flex items-start gap-3 text-left">
										<span className="text-primary text-sm font-medium">Q{index + 1}.</span>
										<span className="flex-1 text-secondary group-hover:text-primary transition-colors">
											{faq.q}
										</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-5 pt-2 text-secondary/70 leading-relaxed">
									<div className="flex">
										<span className="text-primary/50 text-sm font-medium w-6 shrink-0">A.</span>
										<span className="flex-1">{faq.a}</span>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			<Separator />
			<Footer />
		</div>
	);
}
