"use client";

import { useEffect, Suspense, useState, act } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { BaseApiError } from "@/lib/types";
import GoogleLoginButton from "@/components/authentication/google-login-button";
import { UserType } from "@/lib/enums";
import { ROUTES } from "@/lib/routes";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const [activeTab, setActiveTab] = useState<UserType>(
    (searchParams.get("userType") as UserType) || UserType.CONTRACTOR
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.dashboard());
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    reset(); // Reset form when tab changes
  }, [activeTab, reset]);

  if (isAuthenticated) {
    return null;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      toast.success(response.message || "Login successful");
      router.push(ROUTES.dashboard());
      router.refresh();
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Login failed";
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
                Welcome back
              </h1>
              <p className="text-lg text-gray-600">
                Log in to your account to continue
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="relative">
                <img
                  src={"/auth-illustration1.png"}
                  alt={isHomeowner ? "Homeowner illustration" : "Contractor illustration"}
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
                   router.push(ROUTES.login({ userType: value as UserType }));
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
                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     type="email"
                     placeholder="user@example.com"
                     {...register("email")}
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
                     {...register("password")}
                   />
                   {errors.password && (
                     <p className="text-sm text-red-500">
                       {errors.password.message}
                     </p>
                   )}
                 </div>

                 <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading ? "Signing in..." : "Sign In"}
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
                   Don't have an account?{" "}
                   <Link href={ROUTES.signup({ userType: activeTab })} className="text-primary hover:underline">
                     Sign up
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
