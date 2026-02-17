'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLoginMutation } from '@/lib/api/auth-api-slice';
import { useAuth } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [login, { isLoading }] = useLoginMutation();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	// Redirect if already authenticated
	if (isAuthenticated) {
		router.push('/');
		return null;
	}

	const onSubmit = async (data: LoginFormData) => {
		try {
			setError(null);
			const response = await login(data).unwrap();

			if (response.success) {
				toast.success('Login successful');
				router.push('/');
				router.refresh();
			} else {
				setError(response.error || 'Login failed');
			}
		} catch (err: unknown) {
			const errorMessage = err && typeof err === 'object' && 'data' in err
				? (err.data as { error?: string })?.error || 'Login failed'
				: 'Login failed';
			setError(errorMessage);
			toast.error(errorMessage);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Enter your credentials to access your account</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4">
						{error && (
							<div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
								{error}
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="user@example.com"
								{...register('email')}
							/>
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								{...register('password')}
							/>
							{errors.password && (
								<p className="text-sm text-red-500">{errors.password.message}</p>
							)}
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Sign In'}
						</Button>
						<p className="text-sm text-center text-gray-600">
							Don't have an account?{' '}
							<Link href="/signup" className="text-blue-600 hover:underline">
								Sign up
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
