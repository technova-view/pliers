"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForgotPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation } from "@/lib/api/auth-api-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BaseApiError } from "@/lib/types";
import { ROUTES } from "@/lib/routes";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ForgotPasswordContent() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [forgotPassword, { isLoading: isSendingOtp }] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleResetPasswordSubmit,
    formState: { errors: resetPasswordErrors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Auto-focus first OTP input when step changes
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const onSendOtp = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      setEmail(data.email);
      setStep("otp");
      toast.success("OTP sent to your email");
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Failed to send OTP";
      toast.error(errorMessage);
    }
  };

  const onVerifyAndReset = async (data: ResetPasswordFormData) => {
    const otp = otpValues.join("");

    if (otp.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setOtpError("");

    try {
      // First verify the OTP
      await verifyOtp({ email, otp }).unwrap();

      // Then reset the password
      await resetPassword({
        email,
        otp,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password reset successfully");
      window.location.href = ROUTES.login();
    } catch (error: unknown) {
      const errorformat = error as BaseApiError;
      const errorMessage =
        errorformat.data?.message || errorformat.data?.error || "Failed to reset password";
      toast.error(errorMessage);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "");
    if (!digit && value !== "") return; // Non-digit typed, ignore

    // If two chars (old + new), take the last one (newly typed)
    const newChar = digit.length > 1 ? digit[digit.length - 1] : digit;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = newChar;
    setOtpValues(newOtpValues);

    // Auto-focus next input when a digit is entered
    if (newChar && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otpValues[index]) {
        // Clear current field
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      } else if (index > 0) {
        // Move to previous field and clear it
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = "";
        setOtpValues(newOtpValues);
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtpValues = [...otpValues];

    for (let i = 0; i < pastedData.length; i++) {
      newOtpValues[i] = pastedData[i];
    }

    setOtpValues(newOtpValues);

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = newOtpValues.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1) {
      otpInputRefs.current[nextEmptyIndex]?.focus();
    } else {
      otpInputRefs.current[5]?.focus();
    }
  };

  const combinedOtp = otpValues.join("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col font-primary">
      <Header showAuthButtons={false} />
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Branding & Illustration */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                <span className="bg-secondary bg-clip-text text-transparent">
                  {step === "email" ? "Forgot Password?" : "Reset Password"}
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                {step === "email"
                  ? "No worries, we'll send you reset instructions"
                  : "Enter the OTP and create a new password"}
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <div className="absolute inset-0" />
              <img
                src="/auth-illustration.webp"
                alt="Password reset illustration"
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
                  {step === "email" ? "Forgot Password?" : "Reset Password"}
                </h1>
                <p className="text-gray-600">
                  {step === "email"
                    ? "No worries, we'll send you reset instructions"
                    : "Enter the OTP and create a new password"}
                </p>
              </div>

              {step === "email" ? (
                <form onSubmit={handleForgotPasswordSubmit(onSendOtp)} className="space-y-5">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Reset your password</h2>
                    <p className="text-gray-600 mt-2">
                      Enter your email address and we'll send you an OTP to reset your password.
                    </p>
                  </div>

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
                        {...registerForgotPassword("email")}
                      />
                    </div>
                    {forgotPasswordErrors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <span>•</span> {forgotPasswordErrors.email.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                    disabled={isSendingOtp}
                  >
                    {isSendingOtp ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Send OTP</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link href={ROUTES.login()} className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors">
                      Sign in
                    </Link>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit(onVerifyAndReset)} className="space-y-5">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Enter OTP</h2>
                    <p className="text-gray-600 mt-2">
                      We sent a 6-digit code to <strong>{email}</strong>. The OTP is valid for 15 minutes.
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">OTP (6 digits)</Label>
                    <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                      {otpValues.map((value, index) => (
                        <Input
                          key={index}
                          ref={(el) => { otpInputRefs.current[index] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          value={value}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-lg font-semibold bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder=""
                        />
                      ))}
                    </div>
                    {otpError && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <span>•</span> {otpError}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        {...registerResetPassword("newPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {resetPasswordErrors.newPassword && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <span>•</span> {resetPasswordErrors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="pl-10 pr-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        {...registerResetPassword("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {resetPasswordErrors.confirmPassword && (
                      <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                        <span>•</span> {resetPasswordErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                    disabled={isVerifying || isResetting || combinedOtp.length !== 6}
                  >
                    {isVerifying || isResetting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Reset Password</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Didn't receive the OTP?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setOtpValues(["", "", "", "", "", ""]);
                        setOtpError("");
                      }}
                      className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
                    >
                      Request new OTP
                    </button>
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

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 animate-pulse">Loading...</p>
        </div>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}
