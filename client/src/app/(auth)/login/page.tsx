"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoginMutation } from "@/lib/api/auth-api-slice";
import { useAuth } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BaseApiError } from "@/lib/types";
import GoogleLoginButton from "@/components/authentication/google-login-button";
import { UserType } from "@/lib/enums";
import { ROUTES } from "@/lib/routes";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  // Get userType from URL params or default to CONTRACTOR
  const userType = (searchParams.get("userType") as UserType) || UserType.CONTRACTOR;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.dashboard());
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      toast.success(response.message || "Welcome back!");
      router.push(ROUTES.dashboard());
      router.refresh();
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Invalid email or password";
      toast.error(errorMessage);
    }
  };

  const isHomeowner = userType === UserType.HOME_OWNER;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col font-primary">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Branding & Illustration */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Log in to your account
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                Sign in to your account to get started with our service
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <div className="absolute inset-0" />
              <img
                src="/auth-illustration1.png"
                alt="Login Illustration"
                className="relative w-full h-auto "
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Mobile header */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your journey
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <span>•</span> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <span>•</span> {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
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
                  userType={userType}
                  className="w-full h-12 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                />

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href={ROUTES.signup({ userType })}
                    className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>

                {/* Terms (mobile only) */}
                <p className="lg:hidden text-center text-xs text-gray-500 mt-6">
                  By signing in, you agree to our{" "}
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

      {/* Footer - Desktop only */}
      <div className="hidden lg:block text-center pb-6 text-xs text-gray-500">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="hover:underline text-gray-700">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:underline text-gray-700">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 animate-pulse">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
