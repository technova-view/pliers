import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	ArrowRight,
	Zap,
	Users,
	Clock,
	CheckCircle,
	Star,
	MessageCircle,
	Wrench,
	Home,
	Building2,
	Sparkles,
	TrendingUp,
	Award
} from "lucide-react";

export default function LandingPage() {
	const features = [
		{
			icon: <Zap className="w-6 h-6 text-primary" />,
			title: "AI Diagnosis Engine",
			description: "Get instant, accurate problem diagnosis with safety warnings and DIY suggestions.",
			image: "/ai-diagnosis-illustration.avif",
			gradient: "from-blue-500 to-cyan-500"
		},
		{
			icon: <MessageCircle className="w-6 h-6 text-primary" />,
			title: "Smart Job Briefs",
			description: "Auto-generated structured summaries with trade, urgency, and location details.",
			image: "/job-brief-illustration.jpg",
			gradient: "from-purple-500 to-pink-500"
		},
		{
			icon: <TrendingUp className="w-6 h-6 text-primary" />,
			title: "Pay-Per-Lead Marketplace",
			description: "Quality leads for contractors with transparent pricing and instant connections.",
			image: "/lead.avif",
			gradient: "from-orange-500 to-red-500"
		}
	];

	const steps = [
		{
			icon: <MessageCircle className="w-8 h-8 text-white" />,
			title: "Describe the Problem",
			description: "Simply chat about your home issue in plain English. Our AI understands context and details.",
			image: "/describe.jpg",
			color: "bg-blue-500"
		},
		{
			icon: <Sparkles className="w-8 h-8 text-white" />,
			title: "AI Generates Diagnosis",
			description: "Receive structured insights with possible causes, urgency level, and safety precautions.",
			image: "/ai-thinking.avif",
			color: "bg-purple-500"
		},
		{
			icon: <Wrench className="w-8 h-8 text-white" />,
			title: "Connect with Pros",
			description: "Qualified contractors purchase relevant leads and reach out with competitive quotes.",
			image: "/professionals.jpg",
			color: "bg-orange-500"
		}
	];

	const stats = [
		{ value: "10K+", label: "Happy Homeowners", icon: <Home className="w-5 h-5" /> },
		{ value: "500+", label: "Verified Contractors", icon: <Building2 className="w-5 h-5" /> },
		{ value: "98%", label: "Satisfaction Rate", icon: <Star className="w-5 h-5" /> },
		{ value: "< 2min", label: "Average Response", icon: <Clock className="w-5 h-5" /> }
	];

	const testimonials = [
		{
			name: "Sarah Johnson",
			role: "Homeowner",
			content: "Pliers saved me thousands! The AI diagnosed my AC issue accurately, and I found a great contractor within hours.",
			rating: 5,
			image: "/avatar.jpeg"
		},
		{
			name: "Mike Peterson",
			role: "Contractor",
			content: "As a contractor, the leads are high-quality and relevant. Best investment for my business growth.",
			rating: 5,
			image: "/avatar.jpeg"
		},
		{
			name: "Emily Chen",
			role: "Property Manager",
			content: "Managing 20+ properties is now effortless. Pliers helps me prioritize issues and find reliable contractors instantly.",
			rating: 5,
			image: "/avatar.jpeg"
		}
	];

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
			{/* NAVBAR */}
			<header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
					<Link href="/" className="flex items-center gap-2 group">
						<div className="relative w-40 h-16">
							<Image
								fill
								src="/logo.svg"
								alt="Pliers Logo"
								className="object-contain group-hover:scale-110 transition-transform duration-300 shrink-0"
							/>
						</div>
					</Link>

					<nav className="hidden md:flex items-center gap-8">
						{['Features', 'How it works', 'Pricing', 'Testimonials'].map((item) => (
							<Link
								key={item}
								href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
							>
								{item}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
							</Link>
						))}
						<Link
							href="/contractors"
							className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
						>
							Become a Contractor
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
						</Link>
					</nav>

					<div className="flex items-center gap-3">
						<ThemeToggle />
						<Link href="/login">
							<Button variant="ghost" className="hidden sm:inline-flex hover:bg-primary/10">
								Login
							</Button>
						</Link>
					</div>
				</div>
			</header>

			{/* HERO SECTION */}
			<section className="relative overflow-hidden pt-16 md:pt-24">
				{/* Background decoration */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
				</div>

				<div className="container mx-auto px-4 md:px-6">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8 animate-in slide-in-from-left-50 duration-700">
							<Badge
								variant="secondary"
								className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
							>
								<Sparkles className="w-4 h-4 mr-2" />
								AI-Powered Home Diagnostics
							</Badge>

							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
								Something wrong at home? Let's fix it.
								<span className="block text-transparent bg-gradient-to-r from-primary to-blue-600 bg-clip-text">
									Every home problem, solved.
								</span>
							</h1>

							<p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
								Describe the problem in plain language. Pliers helps you understand what's happening, what to do next, and connects you to trusted local professionals if you need them.
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<Link href="/#">
									<Button size="lg" className="group px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all duration-300">
										Explain My Problem
										<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>
								<Link href="/#">
									<Button size="lg" variant="outline" className="px-8 py-6 text-base border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300">
										<Users className="mr-2 w-4 h-4" />
										Find a Contractor
									</Button>
								</Link>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
								{stats.map((stat, index) => (
									<div key={index} className="text-center group cursor-default">
										<div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
											{stat.value}
										</div>
										<div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
											{stat.icon}
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative lg:block animate-in slide-in-from-right-50 duration-700">
							<div className="relative w-full h-[500px] md:h-[600px]">
								<Image
									src="/hero-dashboard.jpg"
									alt="Pliers Dashboard"
									fill
									className="object-cover rounded-2xl"
									priority
								/>
							</div>

							{/* Floating elements */}
							<div className="absolute -top-4 -right-4 animate-bounce">
								<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3">
									<CheckCircle className="w-6 h-6 text-green-500" />
								</div>
							</div>
							<div className="absolute -bottom-4 -left-4 animate-pulse">
								<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3">
									<Zap className="w-6 h-6 text-yellow-500" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FEATURES SECTION */}
			<section id="features" className="py-24 relative">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
						<Badge variant="outline" className="px-4 py-2">
							<Sparkles className="w-4 h-4 mr-2" />
							Powerful Features
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold">
							Built for Homeowners & Contractors
						</h2>
						<p className="text-muted-foreground text-lg">
							AI-driven insights for homeowners and a transparent lead marketplace
							for contractors.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="group relative overflow-hidden border-0 bg-gradient-to-b from-background to-muted/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
							>
								<div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${feature.gradient}`} />

								<CardHeader>
									<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
										{feature.icon}
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
								</CardHeader>

								<CardContent className="space-y-4">
									<p className="text-muted-foreground">
										{feature.description}
									</p>

									<div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
										<Image
											src={feature.image}
											alt={feature.title}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* HOW IT WORKS */}
			<section id="how-it-works" className="py-24 bg-gradient-to-b from-muted/30 to-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="px-4 py-2">
							<Clock className="w-4 h-4 mr-2" />
							Simple Process
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold">
							How It Works in 3 Simple Steps
						</h2>
						<p className="text-muted-foreground text-lg">
							Simple, fast, and transparent for everyone.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 relative">
						{steps.map((step, index) => (
							<div key={index} className="relative group">
								<div className="text-center space-y-4">
									<div className="relative">
										<div className={`w-20 h-20 ${step.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
											{step.icon}
										</div>
										<div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl">
											{index + 1}
										</div>
									</div>

									<h3 className="text-xl font-semibold">{step.title}</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{step.description}
									</p>

									<div className="relative w-full h-60 mt-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
										<Image
											src={step.image}
											alt={step.title}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* TESTIMONIALS */}
			<section id="testimonials" className="py-24">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center space-y-4 mb-16">
						<Badge variant="outline" className="px-4 py-2">
							<Star className="w-4 h-4 mr-2 fill-current" />
							Trusted by Thousands
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold">
							What Our Users Say
						</h2>
						<p className="text-muted-foreground text-lg">
							Join thousands of satisfied homeowners and contractors.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card key={index} className="relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
								<CardContent className="p-6 space-y-4">
									<div className="flex gap-1">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
										))}
									</div>

									<p className="text-muted-foreground italic">
										"{testimonial.content}"
									</p>

									<div className="flex items-center gap-3 pt-4">
										<div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-blue-600">
											<Image
												src={testimonial.image}
												alt={testimonial.name}
												fill
												className="object-cover"
											/>
										</div>
										<div>
											<p className="font-semibold">{testimonial.name}</p>
											<p className="text-sm text-muted-foreground">{testimonial.role}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA SECTION */}
			<section className="py-24 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary opacity-5" />
				<div className="absolute inset-0" style={{
					backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)",
					backgroundSize: "40px 40px"
				}} />

				<div className="container mx-auto px-4 md:px-6 text-center relative">
					<div className="max-w-3xl mx-auto space-y-8">
						<Badge className="px-4 py-2 bg-primary/20 text-primary border-primary/30">
							<Zap className="w-4 h-4 mr-2" />
							Start Your Journey Today
						</Badge>

						<h2 className="text-4xl md:text-5xl font-bold">
							Ready to Simplify Home Repairs?
						</h2>

						<p className="text-xl text-muted-foreground">
							Experience AI-powered home diagnostics and a smarter contractor
							marketplace today. Join thousands of satisfied users.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
							<Link href="/signup">
								<Button size="lg" className="group px-10 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:shadow-2xl transition-all duration-300">
									Get Started Free
									<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Button>
							</Link>
							<Link href="/signup">
								<Button size="lg" variant="outline" className="px-10 py-6 text-lg border-2 hover:bg-primary/5 transition-all duration-300">
									<Award className="mr-2 w-5 h-5" />
									Become a Contractor
								</Button>
							</Link>
						</div>

						<p className="text-sm text-muted-foreground">
							No credit card required • Free 14-day trial • Cancel anytime
						</p>
					</div>
				</div>
			</section>

			{/* FAQ SECTION */}
			<section id="faq" className="py-24 bg-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
						<p className="text-lg text-muted-foreground">
							Everything you need to know about using Pliers for your home problems.
						</p>
					</div>

					<div className="max-w-3xl mx-auto space-y-6">
						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">1. What is Pliers?</h3>
							<p className="text-muted-foreground">
								Pliers is a home problem-solving platform. You describe what's going wrong in your home — in plain language — and Pliers helps you understand what might be happening, whether it's urgent, and what to do next. If you need professional help, we can connect you to contractors in your area.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">2. Is Pliers just another directory?</h3>
							<p className="text-muted-foreground">
								No. Pliers doesn't just list contractors. It first helps you understand the problem. We guide you through what could be causing it and whether it's safe to try fixing it yourself before connecting you to a professional. It's about clarity first — then action.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">3. Is this the same as using ChatGPT?</h3>
							<p className="text-muted-foreground">
								Not quite. ChatGPT gives general information. Pliers is built specifically for home issues. We ask follow-up questions relevant to your situation, highlight safety risks, help decide between DIY and professional help, and connect you to local contractors if needed. It's designed to help you move from "What's wrong?" to "It's fixed."
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">4. Does Pliers replace a professional?</h3>
							<p className="text-muted-foreground">
								No. Pliers provides guidance to help you understand what might be happening. For complex or potentially unsafe issues, we recommend consulting a qualified professional. If needed, we can help you connect with one.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">5. Is it safe to follow the advice?</h3>
							<p className="text-muted-foreground">
								Pliers is designed to avoid risky or dangerous DIY recommendations. If something appears unsafe, we will advise you to stop and consult a professional. When in doubt, safety comes first.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">6. Do I have to hire a contractor through Pliers?</h3>
							<p className="text-muted-foreground">
								No. You can use Pliers simply to understand your issue. If you decide you need help, you can choose whether or not to connect with a contractor.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">7. How much does it cost to use Pliers?</h3>
							<p className="text-muted-foreground">
								For homeowners, using Pliers to understand your problem is free. If you choose to hire a contractor, pricing will depend on the service provider and the work required.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">8. How do I know the contractors are legitimate?</h3>
							<p className="text-muted-foreground">
								Contractors on Pliers go through a basic approval process before being listed. We aim to connect you with professionals who operate in your area and category. We encourage homeowners to review credentials, ask questions, and confirm details before hiring.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">9. Can I upload photos of the problem?</h3>
							<p className="text-muted-foreground">
								Yes. Uploading photos can help provide better guidance and clearer job briefs for contractors.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">10. What types of home problems does Pliers cover?</h3>
							<p className="text-muted-foreground">
								Pliers supports common household issues such as plumbing, electrical, geysers and hot water systems, appliance breakdowns, security and access issues, and general repairs. More categories will be added over time.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">11. Is my information private?</h3>
							<p className="text-muted-foreground">
								Yes. Your information is only used to help diagnose your issue and, if requested, to connect you with contractors. We do not sell your personal information.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">12. What areas does Pliers operate in?</h3>
							<p className="text-muted-foreground">
								Pliers is currently focused on South Africa and will expand to additional areas over time.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Separator />

			{/* FOOTER */}
			<footer className="py-12 bg-gradient-to-b from-background to-muted/20">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div className="space-y-4">
							<div className="relative w-30 h-12">
								<Image
									fill
									src="/logo.svg"
									alt="Pliers Logo"
									className="object-contain group-hover:scale-110 transition-transform duration-300 shrink-0"
								/>
							</div>
							<p className="text-sm text-muted-foreground">
								AI-powered home diagnostics connecting homeowners with trusted contractors.
							</p>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Product</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
								<li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
								<li><Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
								<li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
								<li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Legal</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
								<li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
								<li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
							</ul>
						</div>
					</div>

					<Separator className="my-8" />

					<div className="text-center text-sm text-muted-foreground">
						© {new Date().getFullYear()} Pliers. All rights reserved. Made with ❤️ for homeowners and contractors.
					</div>
				</div>
			</footer>
		</div>
	);
}