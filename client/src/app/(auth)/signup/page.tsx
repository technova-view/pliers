"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignupMutation } from "@/lib/api/auth-api-slice";
import { useAuth } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BaseApiError, SignupRequest } from "@/lib/types";
import { UserType, ServiceCategory } from "@/lib/enums";
import GoogleLoginButton from "@/components/authentication/google-login-button";
import { ROUTES } from "@/lib/routes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const contractorSignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    businessName: z.string().min(1, "Business name is required"),
    serviceCategory: z.string().min(1, "Please select a service category"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const homeownerSignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ContractorSignupFormData = z.infer<typeof contractorSignupSchema>;
type HomeownerSignupFormData = z.infer<typeof homeownerSignupSchema>;

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [activeTab, setActiveTab] = useState<UserType>(
    (searchParams.get("userType") as UserType) || UserType.CONTRACTOR
  );

  const isContractor = activeTab === UserType.CONTRACTOR;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContractorSignupFormData | HomeownerSignupFormData>({
    resolver: zodResolver(
      isContractor ? contractorSignupSchema : homeownerSignupSchema
    ),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.home());
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    reset(); // Reset form when tab changes
  }, [activeTab, reset]);

  if (isAuthenticated) {
    return null;
  }

  const onSubmit = async (data: ContractorSignupFormData | HomeownerSignupFormData) => {
    try {
      let signupData: SignupRequest;

      if (isContractor) {
        const contractorData = data as ContractorSignupFormData;
        signupData = {
          email: contractorData.email,
          password: contractorData.password,
          firstName: contractorData.firstName,
          lastName: contractorData.lastName,
          userType: activeTab,
          phone: contractorData.phone,
          businessName: contractorData.businessName,
          serviceCategory: contractorData.serviceCategory as ServiceCategory,
        };
      } else {
        const homeownerData = data as HomeownerSignupFormData;
        signupData = {
          email: homeownerData.email,
          password: homeownerData.password,
          firstName: homeownerData.firstName || "",
          lastName: homeownerData.lastName || "",
          userType: activeTab,
        };
      }

      const signupResponse = await signup(signupData).unwrap();

      toast.success(
        signupResponse.message ||
          "Account created successfully! Please sign in."
      );
      router.push(ROUTES.login({ userType: activeTab }));
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Signup failed";
      toast.error(errorMessage);
    }
  };

  // Helper to get error message
  const getErrorMessage = (error: FieldErrors<ContractorSignupFormData | HomeownerSignupFormData> | undefined, field: string): string | undefined => {
    if (!error || !error[field as keyof FieldErrors<ContractorSignupFormData | HomeownerSignupFormData>]) {
      return undefined;
    }
    const fieldError = error[field as keyof FieldErrors<ContractorSignupFormData | HomeownerSignupFormData>];
    if (fieldError && typeof fieldError === 'object' && 'message' in fieldError) {
      return fieldError.message as string;
    }
    return undefined;
  };

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
                  src={"/auth-illustration.png"}
                  alt={isContractor ? "Contractor illustration" : "Homeowner illustration"}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
               {/* Tab system */}
               <div className="mb-8">
                <Tabs defaultValue={UserType.CONTRACTOR} value={activeTab} onValueChange={(value) => {
                  setActiveTab(value as UserType);
                  router.push(ROUTES.signup({ userType: value as UserType }));
                }}>
                  <TabsList className="w-full">
                    <TabsTrigger value={UserType.CONTRACTOR} className="flex-1">
                      Contractor
                    </TabsTrigger>
                    <TabsTrigger value={UserType.HOME_OWNER} className="flex-1">
                      Homeowner
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Common fields for both user types */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name {!isContractor && '(Optional)'}</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName")}
                    />
                    {getErrorMessage(errors, "firstName") && (
                      <p className="text-sm text-red-500">
                        {getErrorMessage(errors, "firstName")}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name {!isContractor && '(Optional)'}</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    {getErrorMessage(errors, "lastName") && (
                      <p className="text-sm text-red-500">
                        {getErrorMessage(errors, "lastName")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contractor-specific fields */}
                {isContractor && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        {...register("phone")}
                      />
                      {getErrorMessage(errors, "phone") && (
                        <p className="text-sm text-red-500">
                          {getErrorMessage(errors, "phone")}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        placeholder="ABC Plumbing Services"
                        {...register("businessName")}
                      />
                      {getErrorMessage(errors, "businessName") && (
                        <p className="text-sm text-red-500">
                          {getErrorMessage(errors, "businessName")}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceCategory">Service Category</Label>
                      <select
                        id="serviceCategory"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("serviceCategory")}
                      >
                        <option value="">Select a service category</option>
                        <option value={ServiceCategory.PLUMBING}>Plumbing</option>
                        <option value={ServiceCategory.ELECTRICAL}>Electrical</option>
                        <option value={ServiceCategory.GARDENING_AND_LANDSCAPING}>Gardening & Landscaping</option>
                        <option value={ServiceCategory.CARPENTRY}>Carpentry</option>
                      </select>
                      {getErrorMessage(errors, "serviceCategory") && (
                        <p className="text-sm text-red-500">
                          {getErrorMessage(errors, "serviceCategory")}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    {...register("email")}
                  />
                  {getErrorMessage(errors, "email") && (
                    <p className="text-sm text-red-500">{getErrorMessage(errors, "email")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    {...register("password")}
                  />
                  {getErrorMessage(errors, "password") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors, "password")}
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
                  />
                  {getErrorMessage(errors, "confirmPassword") && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors, "confirmPassword")}
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isSignupLoading}>
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
                   <Link href={ROUTES.login({ userType: activeTab })} className="text-primary hover:underline">
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
