"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForgotPasswordMutation } from "@/lib/api/auth-api-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BaseApiError } from "@/lib/types";
import { ROUTES } from "@/lib/routes";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      setEmailSent(true);
      toast.success("OTP sent to your email");
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Failed to send OTP";
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
                Forgot Password?
              </h1>
              <p className="text-lg text-gray-600">
                No worries, we'll send you reset instructions
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
              {!emailSent ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Reset your password</h2>
                    <p className="text-gray-600 mt-2">
                      Enter your email address and we'll send you an OTP to reset your password.
                    </p>
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

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                      Remember your password?{" "}
                      <Link href={ROUTES.login()} className="text-primary hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center">Check your email</h2>
                    <p className="text-gray-600 mt-2 text-center">
                      We sent a 6-digit OTP to your email. The OTP is valid for 15 minutes.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => router.push(ROUTES.resetPassword())}
                      className="w-full"
                    >
                      Continue to Reset Password
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                      Did't receive the email?{" "}
                      <button
                        onClick={() => setEmailSent(false)}
                        className="text-primary hover:underline"
                      >
                        Try again
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
