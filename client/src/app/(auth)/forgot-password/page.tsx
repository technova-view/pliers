"use client";

import { useState, useRef, useEffect } from "react";
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

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
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
    <div className="bg-background min-h-screen flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Illustration */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">
                {step === "email" ? "Forgot Password?" : "Reset Password"}
              </h1>
              <p className="text-lg text-gray-600">
                {step === "email"
                  ? "No worries, we'll send you reset instructions"
                  : "Enter the OTP and create a new password"}
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
              {step === "email" ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Reset your password</h2>
                    <p className="text-gray-600 mt-2">
                      Enter your email address and we'll send you an OTP to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleForgotPasswordSubmit(onSendOtp)} className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        {...registerForgotPassword("email")}
                      />
                      {forgotPasswordErrors.email && (
                        <p className="text-sm text-red-500">{forgotPasswordErrors.email.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSendingOtp}>
                      {isSendingOtp ? "Sending..." : "Send OTP"}
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
                    <h2 className="text-2xl font-bold">Enter OTP</h2>
                    <p className="text-gray-600 mt-2">
                      We sent a 6-digit code to <strong>{email}</strong>. The OTP is valid for 15 minutes.
                    </p>
                  </div>

                  <form onSubmit={handleResetPasswordSubmit(onVerifyAndReset)} className="flex flex-col gap-4">
                    {/* OTP Input */}
                    <div className="space-y-2">
                      <Label>OTP (6 digits)</Label>
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
                            className="w-12 h-12 text-center text-lg font-semibold"
                            placeholder=""
                          />
                        ))}
                      </div>
                      {otpError && (
                        <p className="text-sm text-red-500">{otpError}</p>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        {...registerResetPassword("newPassword")}
                      />
                      {resetPasswordErrors.newPassword && (
                        <p className="text-sm text-red-500">{resetPasswordErrors.newPassword.message}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        {...registerResetPassword("confirmPassword")}
                      />
                      {resetPasswordErrors.confirmPassword && (
                        <p className="text-sm text-red-500">{resetPasswordErrors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isVerifying || isResetting || combinedOtp.length !== 6}
                    >
                      {isVerifying || isResetting ? "Processing..." : "Reset Password"}
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
                        className="text-primary hover:underline"
                      >
                        Request new OTP
                      </button>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}