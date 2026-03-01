"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useVerifyOtpMutation, useResetPasswordMutation } from "@/lib/api/auth-api-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BaseApiError } from "@/lib/types";
import { ROUTES } from "@/lib/routes";

const resetPasswordSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  
  const [email, setEmail] = useState(emailFromUrl);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const verifyOtpSubmit = async (data: ResetPasswordFormData) => {
    try {
      await verifyOtp({ email, otp: data.otp }).unwrap();
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Invalid OTP";
      toast.error(errorMessage);
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password reset successfully");
      router.push(ROUTES.login());
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Failed to reset password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Illustration */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">
                Reset Password
              </h1>
              <p className="text-lg text-gray-600">
                Create a new password for your account
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="relative">
                <img
                  src={"/auth-illustration1.png"}
                  alt="Password reset illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">
                  {otpVerified ? "Create new password" : "Enter OTP"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {otpVerified
                    ? "Your new password must be different from previously used passwords."
                    : "We sent a 6-digit code to your email. Enter it below."}
                </p>
              </div>

              {!otpVerified ? (
                <form onSubmit={handleSubmit(verifyOtpSubmit)} className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP (6 digits)</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      {...register("otp")}
                    />
                    {errors.otp && (
                      <p className="text-sm text-red-500">{errors.otp.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isVerifying}>
                    {isVerifying ? "Verifying..." : "Verify OTP"}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    <Link href={ROUTES.forgotPassword()} className="text-primary hover:underline">
                      Request new OTP
                    </Link>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      {...register("newPassword")}
                    />
                    {errors.newPassword && (
                      <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isResetting}>
                    {isResetting ? "Resetting..." : "Reset Password"}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    <Link href={ROUTES.login()} className="text-primary hover:underline">
                      Back to login
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
