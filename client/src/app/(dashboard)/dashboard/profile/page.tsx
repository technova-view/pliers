'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { User, Mail, Save } from 'lucide-react';
import { useGetUserQuery, useUpdateUserMutation } from '@/lib/api/users-api-slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const profileSchema = z.object({
	firstName: z.string().min(1, 'First name is required').max(100, 'First name is too long'),
	lastName: z.string().min(1, 'Last name is required').max(100, 'Last name is too long'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
	const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
	const user = userData?.data;
	
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
	
	const [isInitialized, setIsInitialized] = useState(false);
	
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
		},
	});

	// Initialize form with user data
	useEffect(() => {
		if (user && !isInitialized) {
			setValue('firstName', user.firstName || '');
			setValue('lastName', user.lastName || '');
			setIsInitialized(true);
		}
	}, [user, setValue, isInitialized]);

	const onSubmit = async (data: ProfileFormData) => {
		try {
			await updateUser(data).unwrap();
			toast.success('Profile updated successfully');
		} catch (error) {
			toast.error('Failed to update profile');
		}
	};

	if (isLoadingUser && !user) {
		return (
			<div className="flex items-center justify-center min-h-100">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8 px-4 max-w-2xl">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<User className="h-5 w-5" />
						Profile Settings
					</CardTitle>
					<CardDescription>
						Update your personal information
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* Email (read-only) */}
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<Input
									id="email"
									type="email"
									value={user?.email || ''}
									disabled
									className="bg-muted"
								/>
							</div>
							<p className="text-xs text-muted-foreground">Email cannot be changed</p>
						</div>

						{/* First Name */}
						<div className="space-y-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								{...register('firstName')}
								placeholder="Enter your first name"
							/>
							{errors.firstName && (
								<p className="text-sm text-destructive">{errors.firstName.message}</p>
							)}
						</div>

						{/* Last Name */}
						<div className="space-y-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								{...register('lastName')}
								placeholder="Enter your last name"
							/>
							{errors.lastName && (
								<p className="text-sm text-destructive">{errors.lastName.message}</p>
							)}
						</div>

						{/* Submit Button */}
						<Button type="submit" disabled={isUpdating} className="w-full">
							{isUpdating ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Saving...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</>
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
