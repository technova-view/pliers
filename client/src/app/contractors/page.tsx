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
	Building2,
	Sparkles,
	Target,
	BarChart3,
	DollarSign,
	ShieldCheck
} from "lucide-react";

export default function ContractorLandingPage() {
	const features = [
		{
			icon: <Target className="w-6 h-6 text-primary" />,
			title: "High-Quality Leads",
			description: "Receive pre-qualified leads that match your expertise, location, and availability.",
			image: "/lead.avif",
			gradient: "from-orange-500 to-red-500"
		},
		{
			icon: <DollarSign className="w-6 h-6 text-primary" />,
			title: "Transparent Pricing",
			description: "Pay-per-lead model with no hidden fees. Only pay for relevant opportunities.",
			image: "/job-brief-illustration.jpg",
			gradient: "from-green-500 to-teal-500"
		},
		{
			icon: <BarChart3 className="w-6 h-6 text-primary" />,
			title: "Business Growth Tools",
			description: "Track your performance, manage leads, and grow your customer base with our dashboard.",
			image: "/hero-dashboard.jpg",
			gradient: "from-purple-500 to-pink-500"
		}
	];

	const steps = [
		{
			icon: <MessageCircle className="w-8 h-8 text-white" />,
			title: "Create Your Profile",
			description: "Sign up and create a detailed profile highlighting your skills, experience, and service areas.",
			image: "/professionals.jpg",
			color: "bg-blue-500"
		},
		{
			icon: <Target className="w-8 h-8 text-white" />,
			title: "Receive Relevant Leads",
			description: "Get notified of high-quality leads that match your expertise and service area.",
			image: "/lead.avif",
			color: "bg-orange-500"
		},
		{
			icon: <CheckCircle className="w-8 h-8 text-white" />,
			title: "Connect with Customers",
			description: "Purchase leads and directly contact homeowners to provide quotes and services.",
			image: "/professionals.jpg",
			color: "bg-green-500"
		}
	];

	const stats = [
		{ value: "500+", label: "Active Contractors", icon: <Building2 className="w-5 h-5" /> },
		{ value: "10K+", label: "Leads Delivered", icon: <Target className="w-5 h-5" /> },
		{ value: "95%", label: "Lead Quality", icon: <Star className="w-5 h-5" /> },
		{ value: "< 24h", label: "Average Response", icon: <Clock className="w-5 h-5" /> }
	];

	const testimonials = [
		{
			name: "Mike Peterson",
			role: "Plumbing Specialist",
			content: "Pliers has transformed my business. The leads are high-quality, and the pay-per-lead model is fair and transparent.",
			rating: 5,
			image: "/avatar.jpeg"
		},
		{
			name: "Sarah Williams",
			role: "Electrical Contractor",
			content: "I've seen a 30% increase in qualified leads since joining Pliers. The dashboard makes lead management effortless.",
			rating: 5,
			image: "/avatar.jpeg"
		},
		{
			name: "David Brown",
			role: "HVAC Technician",
			content: "The pre-qualified leads save me time and money. I only pay for the opportunities that matter to my business.",
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
						{['Benefits', 'How it works', 'Pricing', 'Testimonials'].map((item) => (
							<Link
								key={item}
								href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
							>
								{item}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-3">
						{/* <ThemeToggle /> */}
						<Link href="/login">
							<Button variant="ghost" className="hidden sm:inline-flex hover:bg-primary/10">
								Login
							</Button>
						</Link>
						<Link href="/signup">
							<Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
								Create Account
								<ArrowRight className="ml-2 w-4 h-4" />
							</Button>
						</Link>
					</div>
				</div>
			</header>

			{/* HERO SECTION */}
			<section className="relative overflow-hidden pt-16 md:pt-24">
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
				</div>

				<div className="container mx-auto px-4 md:px-6">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8 animate-in slide-in-from-left-50 duration-700">
							<Badge
								variant="secondary"
								className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
							>
								<Sparkles className="w-4 h-4 mr-2" />
								For Professional Contractors
							</Badge>

							<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
								Grow Your Business.
								<span className="block text-transparent bg-gradient-to-r from-primary to-green-600 bg-clip-text">
									Get Quality Leads.
								</span>
							</h1>

							<p className="text-base text-muted-foreground max-w-xl leading-relaxed">
								Pliers connects you with homeowners in need of your services. Our AI-driven platform delivers
								pre-qualified leads with detailed job briefs, helping you win more customers efficiently.
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<Link href="/signup">
									<Button size="lg" className="group px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all duration-300">
										Create Your Account
										<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>
								<Link href="/login">
									<Button size="lg" variant="outline" className="px-8 py-6 text-base border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300">
										<Users className="mr-2 w-4 h-4" />
										Login to Dashboard
									</Button>
								</Link>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
								{stats.map((stat, index) => (
									<div key={index} className="text-center group cursor-default">
										<div className="text-3xl tracking-tight text-primary group-hover:scale-110 transition-transform duration-300">
											{stat.value}
										</div>
										<div className="text-sm text-muted-foreground">{stat.label}</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative animate-in slide-in-from-right-50 duration-700">
							<div className="relative rounded-2xl overflow-hidden border bg-background shadow-2xl">
								<Image
									src="/professionals.jpg"
									alt="Contractors working"
									width={600}
									height={400}
									className="object-cover w-full h-full"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
								<div className="absolute bottom-0 left-0 right-0 p-6">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
											<ShieldCheck className="w-6 h-6 text-primary" />
										</div>
										<div>
											<p className="font-semibold">Verified Contractors</p>
											<p className="text-sm text-muted-foreground">Background Checked</p>
										</div>
									</div>
								</div>
							</div>
							<div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
							<div className="absolute -top-6 -right-6 w-48 h-48 bg-green-500/10 rounded-full blur-2xl" />
						</div>
					</div>
				</div>
			</section>

			{/* BENEFITS SECTION */}
			<section id="benefits" className="py-24 bg-background/50">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Join Pliers as a Contractor</h2>
						<p className="text-base text-muted-foreground">
							We provide you with the tools and opportunities to grow your business effectively.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="group hover:shadow-xl transition-all duration-300 border-muted bg-background/50 hover:bg-background"
							>
								<CardHeader className="flex flex-col items-center text-center pb-6">
									<div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
										{feature.icon}
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<p className="text-muted-foreground mb-6">{feature.description}</p>
									<div className="relative h-48 rounded-xl overflow-hidden">
										<Image
											src={feature.image}
											alt={feature.title}
											width={300}
											height={200}
											className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* HOW IT WORKS SECTION */}
			<section id="how-it-works" className="py-24 bg-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold mb-6">How Pliers Works for Contractors</h2>
						<p className="text-base text-muted-foreground">
							Get started in minutes and start receiving quality leads today.
						</p>
					</div>

					<div className="space-y-12">
						{steps.map((step, index) => (
							<div
								key={index}
								className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
									}`}
							>
								<div className="md:w-1/2 space-y-4">
									<div className="flex items-center gap-3">
										<div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
											{step.icon}
										</div>
										<div>
											<h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
										</div>
									</div>
									<p className="text-muted-foreground text-base">{step.description}</p>
								</div>
								<div className="md:w-1/2 relative">
									<div className="rounded-2xl overflow-hidden border bg-background shadow-lg">
										<Image
											src={step.image}
											alt={step.title}
											width={400}
											height={300}
											className="object-cover w-full h-full"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* TESTIMONIALS SECTION */}
			<section id="testimonials" className="py-24 bg-background/50">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold mb-6">What Contractors Say</h2>
						<p className="text-base text-muted-foreground">
							Hear from professionals who have grown their businesses with Pliers.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card key={index} className="group hover:shadow-lg transition-all duration-300">
								<CardContent className="pt-6">
									<div className="flex items-center gap-2 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
													}`}
											/>
										))}
									</div>
									<p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
											<Image
												src={testimonial.image}
												alt={testimonial.name}
												width={48}
												height={48}
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

			{/* PRICING SECTION */}
			<section id="pricing" className="py-24 bg-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold mb-6">Simple, Transparent Pricing</h2>
						<p className="text-base text-muted-foreground">
							Pay only for the leads that match your expertise and service area.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						<Card className="group hover:shadow-xl transition-all duration-300 border-muted bg-background/50 hover:bg-background">
							<CardHeader>
								<CardTitle className="text-2xl">Basic Plan</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="text-4xl text-primary">R50/lead</div>
								<p className="text-muted-foreground">Perfect for new contractors getting started.</p>
								<Separator />
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Basic lead information</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Up to 5 leads per week</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Standard support</span>
									</li>
								</ul>
								<Link href="/signup">
									<Button className="w-full mt-4">Get Started</Button>
								</Link>
							</CardContent>
						</Card>

						<Card className="group hover:shadow-xl transition-all duration-300 border-primary bg-primary/5 hover:bg-primary/10">
							<CardHeader>
								<Badge className="mb-4">Most Popular</Badge>
								<CardTitle className="text-2xl">Pro Plan</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="text-4xl text-primary">R40/lead</div>
								<p className="text-muted-foreground">For growing businesses with higher lead volume.</p>
								<Separator />
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Detailed job briefs</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Unlimited leads</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Priority support</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-primary" />
										<span>Performance analytics</span>
									</li>
								</ul>
								<Link href="/signup">
									<Button className="w-full mt-4">Get Started</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* FAQ SECTION */}
			<section id="faq" className="py-24 bg-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold mb-6">Frequently Asked Questions</h2>
						<p className="text-base text-muted-foreground">
							Everything you need to know about using Pliers as a contractor.
						</p>
					</div>

					<div className="max-w-3xl mx-auto space-y-6">
						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">1. How does Pliers work for contractors?</h3>
							<p className="text-muted-foreground">
								Homeowners describe their problems. Pliers helps generate a structured job brief. Contractors can view available leads in their category and area and choose whether to unlock the job details.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">2. Do contractors pay to join?</h3>
							<p className="text-muted-foreground">
								No subscription is required to join at this stage. Contractors pay per lead when they choose to access job details.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">3. Are leads exclusive?</h3>
							<p className="text-muted-foreground">
								Some leads may be shared with multiple contractors, while others may be offered as exclusive. Details will be visible before purchasing.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">4. How are leads priced?</h3>
							<p className="text-muted-foreground">
								Lead pricing varies depending on category, urgency, and job type. Contractors only pay if they choose to access a lead.
							</p>
						</div>

						<div className="border rounded-lg p-6 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
							<h3 className="text-xl font-semibold mb-2">5. Is there a contract or minimum spend?</h3>
							<p className="text-muted-foreground">
								No long-term contracts. Contractors decide when and how often to purchase leads.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FINAL CTA SECTION */}
			<section className="py-24 bg-gradient-to-r from-primary/5 to-blue-500/5">
				<div className="container mx-auto px-4 md:px-6">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<h2 className="text-3xl md:text-4xl font-semibold">Ready to Grow Your Business?</h2>
						<p className="text-base text-muted-foreground max-w-2xl mx-auto">
							Join Pliers today and start receiving high-quality leads that match your expertise and service area.
							Create your account in minutes and take control of your business growth.
						</p>
						<Link href="/signup">
							<Button size="lg" className="group px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all duration-300">
								Create Your Account Now
								<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
						<p className="text-sm text-muted-foreground">No contracts. Cancel anytime.</p>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="border-t bg-background py-12">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="space-y-4">
							<div className="relative w-32 h-12">
								<Image
									fill
									src="/logo.svg"
									alt="Pliers Logo"
									className="object-contain"
								/>
							</div>
							<p className="text-muted-foreground text-sm">
								Every home problem, solved.
							</p>
						</div>

						<div>
							<h4 className="font-semibold mb-4">For Contractors</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li><Link href="#benefits" className="hover:text-primary transition-colors">Benefits</Link></li>
								<li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
								<li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
								<li><Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
								<li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
								<li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
								<li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Support</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
								<li><Link href="/support" className="hover:text-primary transition-colors">Contact Support</Link></li>
								<li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
							</ul>
						</div>
					</div>

					<Separator className="my-8" />

					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-muted-foreground">
							© 2024 Pliers. All rights reserved.
						</p>
						<div className="flex items-center gap-4">
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
