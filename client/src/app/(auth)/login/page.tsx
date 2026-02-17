'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
import { BaseApiError } from '@/lib/types';
import GoogleLoginButton from '@/components/google-login-button';

const loginSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [login, { isLoading }] = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/dashboard');
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated) {
		return null;
	}

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await login(data).unwrap();
			toast.success(response.message || 'Login successful');
			router.push('/dashboard');
			router.refresh();

		} catch (error: unknown) {
			const errorformat = error as BaseApiError;
			const errorMessage = errorformat.data?.message || errorformat.data?.error || 'Login failed';
			toast.error(errorMessage);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Enter your credentials to access your account</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<CardContent className="space-y-4">	
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
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>
						<GoogleLoginButton />
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
