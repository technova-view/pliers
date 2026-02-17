import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-4xl w-full space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-5xl font-bold text-gray-900">Welcome to Pliers</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						A powerful web application built with Next.js and NestJS. 
						Streamline your workflow and manage your tasks with ease.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle>Simple to Use</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								Intuitive interface that gets you up and running in minutes.
							</p>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle>Powerful Features</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								Advanced capabilities to handle all your requirements.
							</p>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader>
							<CardTitle>Secure & Reliable</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								Built with security and reliability in mind.
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="text-center">
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/dashboard">
							<Button size="lg" className="px-8 py-6 text-lg">
								Go to Dashboard
							</Button>
						</Link>
						<Link href="/signup">
							<Button size="lg" variant="outline" className="px-8 py-6 text-lg">
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
