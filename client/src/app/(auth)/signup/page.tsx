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
import { Header } from "@/components/header";
import { Building2, Phone, Briefcase, Mail, Lock, User, ChevronRight, Home } from "lucide-react";

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
    reset();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col font-primary">
      <Header userType={activeTab} showAuthButtons={false} />
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Branding & Illustration */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                <span className="bg-secondary  bg-clip-text text-transparent">
                  Join as a {isContractor ? 'Contractor' : 'Homeowner'}
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                {isContractor
                  ? "Start growing your business with quality leads and professional tools"
                  : "Find trusted professionals for your home improvement projects"}
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <div className="absolute inset-0" />
              <img
                src="/auth-illustration1.png"
                alt="Signup Illustration"
                className="relative w-full h-auto"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Mobile header */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create your account
                </h1>
                <p className="text-gray-600">
                  Join as a {isContractor ? 'contractor' : 'homeowner'}
                </p>
              </div>

              {/* Tab system */}
              <div className="mb-8">
                <Tabs
                  defaultValue={UserType.CONTRACTOR}
                  value={activeTab}
                  onValueChange={(value) => {
                    setActiveTab(value as UserType);
                    router.push(ROUTES.signup({ userType: value as UserType }));
                  }}
                >
                  <TabsList className="grid grid-cols-2 w-full bg-muted/50 p-1 rounded-lg">
                    <TabsTrigger
                      value={UserType.CONTRACTOR}
                      className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground/80 transition-all duration-200 font-medium"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Contractor
                    </TabsTrigger>
                    <TabsTrigger
                      value={UserType.HOME_OWNER}
                      className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground/80 transition-all duration-200 font-medium"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Homeowner
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name fields - side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-xs font-medium text-gray-700">
                      First Name {!isContractor}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="pl-9 h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        {...register("firstName")}
                      />
                    </div>
                    {getErrorMessage(errors, "firstName") && (
                      <p className="text-xs text-red-500">{getErrorMessage(errors, "firstName")}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">
                      Last Name {!isContractor}
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      {...register("lastName")}
                    />
                    {getErrorMessage(errors, "lastName") && (
                      <p className="text-xs text-red-500">{getErrorMessage(errors, "lastName")}</p>
                    )}
                  </div>
                </div>

                {/* Email field - after name */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-9 h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      {...register("email")}
                    />
                  </div>
                  {getErrorMessage(errors, "email") && (
                    <p className="text-xs text-red-500">{getErrorMessage(errors, "email")}</p>
                  )}
                </div>

                {/* Contractor-specific fields */}
                {isContractor && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="pl-9 h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                          {...register("phone")}
                        />
                      </div>
                      {getErrorMessage(errors, "phone") && (
                        <p className="text-xs text-red-500">{getErrorMessage(errors, "phone")}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="businessName" className="text-xs font-medium text-gray-700">
                          Business Name
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="businessName"
                            placeholder="ABC Plumbing"
                            className="pl-9 h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            {...register("businessName")}
                          />
                        </div>
                        {getErrorMessage(errors, "businessName") && (
                          <p className="text-xs text-red-500">{getErrorMessage(errors, "businessName")}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="serviceCategory" className="text-xs font-medium text-gray-700">
                          Service
                        </Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                          <select
                            id="serviceCategory"
                            className="pl-9 h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                            {...register("serviceCategory")}
                          >
                            <option value="">Select</option>
                            <option value={ServiceCategory.PLUMBING}>Plumbing</option>
                            <option value={ServiceCategory.ELECTRICAL}>Electrical</option>
                            <option value={ServiceCategory.GARDENING_AND_LANDSCAPING}>Gardening</option>
                            <option value={ServiceCategory.CARPENTRY}>Carpentry</option>
                          </select>
                        </div>
                        {getErrorMessage(errors, "serviceCategory") && (
                          <p className="text-xs text-red-500">{getErrorMessage(errors, "serviceCategory")}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Password fields - stacked */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 8 characters"
                      className="pl-9 h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      {...register("password")}
                    />
                  </div>
                  {getErrorMessage(errors, "password") && (
                    <p className="text-xs text-red-500">{getErrorMessage(errors, "password")}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    className="h-10 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    {...register("confirmPassword")}
                  />
                  {getErrorMessage(errors, "confirmPassword") && (
                    <p className="text-xs text-red-500">{getErrorMessage(errors, "confirmPassword")}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 mt-2"
                  disabled={isSignupLoading}
                >
                  {isSignupLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Login */}
                <GoogleLoginButton
                  userType={activeTab}
                  className="w-full h-11 text-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                />

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href={ROUTES.login({ userType: activeTab })}
                    className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
                  >
                    Log in
                  </Link>
                </p>

                {/* Terms (mobile only) */}
                <p className="lg:hidden text-center text-xs text-gray-500 mt-4">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="hover:underline text-gray-700">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="hover:underline text-gray-700">
                    Privacy Policy
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
