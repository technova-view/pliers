'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSignupMutation, useLoginMutation } from '@/lib/api/auth-api-slice';
import { useAuth } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const signupSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	confirmPassword: z.string(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
	const [login] = useLoginMutation();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
	});

	// Redirect if already authenticated
	if (isAuthenticated) {
		router.push('/');
		return null;
	}

	const onSubmit = async (data: SignupFormData) => {
		try {
			setError(null);
			
			// Signup
			const signupResponse = await signup({
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName,
			}).unwrap();

			if (!signupResponse.success) {
				setError(signupResponse.error || 'Signup failed');
				toast.error(signupResponse.error || 'Signup failed');
				return;
			}

			toast.success('Account created successfully! Please sign in.');

			// Auto-login after signup
			const loginResponse = await login({
				email: data.email,
				password: data.password,
			}).unwrap();

			if (loginResponse.success) {
				router.push('/');
				router.refresh();
			} else {
				router.push('/login');
			}
		} catch (err: unknown) {
			const errorMessage = err && typeof err === 'object' && 'data' in err
				? (err.data as { error?: string })?.error || 'Signup failed'
				: 'Signup failed';
			setError(errorMessage);
			toast.error(errorMessage);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Create an Account</CardTitle>
					<CardDescription>Enter your details to create a new account</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4">
						{error && (
							<div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
								{error}
							</div>
						)}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									placeholder="John"
									{...register('firstName')}
								/>
								{errors.firstName && (
									<p className="text-sm text-red-500">{errors.firstName.message}</p>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									placeholder="Doe"
									{...register('lastName')}
								/>
								{errors.lastName && (
									<p className="text-sm text-red-500">{errors.lastName.message}</p>
								)}
							</div>
						</div>
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
								placeholder="At least 8 characters"
								{...register('password')}
							/>
							{errors.password && (
								<p className="text-sm text-red-500">{errors.password.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword && (
								<p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
							)}
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full" disabled={isSignupLoading}>
							{isSignupLoading ? 'Creating account...' : 'Create Account'}
						</Button>
						<p className="text-sm text-center text-gray-600">
							Already have an account?{' '}
							<Link href="/login" className="text-blue-600 hover:underline">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
