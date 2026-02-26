"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignupMutation } from "@/lib/api/auth-api-slice";
import { useAuth } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BaseApiError } from "@/lib/types";
import { UserType } from "@/lib/enums";
import GoogleLoginButton from "@/components/authentication/google-login-button";

const signupSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [activeTab, setActiveTab] = useState<UserType>(
    (searchParams.get("userType") as UserType) || UserType.CONTRACTOR
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    reset(); // Reset form when tab changes
  }, [activeTab, reset]);

  if (isAuthenticated) {
    return null;
  }

  const onSubmit = async (data: SignupFormData) => {
    try {
      const signupResponse = await signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: activeTab,
      }).unwrap();

      toast.success(
        signupResponse.message ||
          "Account created successfully! Please sign in.",
      );
      router.push(`/login?userType=${activeTab}`);
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Signup failed";
      toast.error(errorMessage);
    }
  };

  const isHomeowner = activeTab === UserType.HOME_OWNER;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Illustration */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">
                Create your account
              </h1>
              <p className="text-lg text-gray-600">
                Let's get started with your account
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <div className="relative">
                <img 
                  src={"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"}
                  alt={isHomeowner ? "Homeowner illustration" : "Contractor illustration"}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Tab system */}
              <div className="mb-8">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => {
                      setActiveTab(UserType.CONTRACTOR);
                      router.push("/signup?userType=CONTRACTOR");
                    }}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                      activeTab === UserType.CONTRACTOR
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Contractor
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab(UserType.HOME_OWNER);
                      router.push("/signup?userType=HOME_OWNER");
                    }}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                      activeTab === UserType.HOME_OWNER
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Homeowner
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName")}
                      className="rounded-lg"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                      className="rounded-lg"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    {...register("email")}
                    className="rounded-lg"
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
                    {...register("password")}
                    className="rounded-lg"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className="rounded-lg"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium" disabled={isSignupLoading}>
                  {isSignupLoading ? "Creating account..." : "Sign Up"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-gray-500">
                      Or
                    </span>
                  </div>
                </div>
                
                <GoogleLoginButton userType={activeTab} className="w-full" />
                
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href={`/login?userType=${activeTab}`} className="text-orange-600 hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
