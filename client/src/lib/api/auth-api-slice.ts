import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  BaseApiResponse,
  AuthTokensResponse,
  RefreshAccessTokenResponse,
  LogoutResponse,
  LoginRequest,
  SignupRequest,
  RefreshTokenRequest,
  GoogleAuthRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from "../types";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAuthTokens,
} from "../cookies";
import { baseQueryWithReauth } from "./base-query";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<BaseApiResponse<AuthTokensResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response: BaseApiResponse<AuthTokensResponse>) => {
        if (response.success && response.data) {
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        }
        return response;
      },
    }),

    signup: builder.mutation<
      BaseApiResponse<{ userId: string }>,
      SignupRequest
    >({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),

    googleAuth: builder.mutation<
      BaseApiResponse<AuthTokensResponse>,
      GoogleAuthRequest
    >({
      query: (data) => ({
        url: "/auth/google",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformResponse: (response: BaseApiResponse<AuthTokensResponse>) => {
        if (response.success && response.data) {
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        }
        return response;
      },
    }),

    refreshAccessToken: builder.mutation<
      BaseApiResponse<RefreshAccessTokenResponse>,
      RefreshTokenRequest
    >({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
        credentials: "include",
      }),
      transformResponse: (
        response: BaseApiResponse<RefreshAccessTokenResponse>,
      ) => {
        if (response.success && response.data) {
          setAccessToken(response.data.accessToken);
        }
        return response;
      },
    }),

    logout: builder.mutation<
      BaseApiResponse<LogoutResponse>,
      RefreshTokenRequest
    >({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body,
        credentials: "include",
      }),
      transformResponse: (response: BaseApiResponse<LogoutResponse>) => {
        clearAuthTokens();
        return response;
      },
    }),

    // Helper to get current tokens for refresh
    getTokens: builder.query<
      { accessToken: string | undefined; refreshToken: string | undefined },
      void
    >({
      queryFn: () => {
        return {
          data: {
            accessToken: getAccessToken(),
            refreshToken: getRefreshToken(),
          },
        };
      },
    }),

    // Forgot password - send OTP to email
    forgotPassword: builder.mutation<
      BaseApiResponse<{ message: string }>,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation<
      BaseApiResponse<{ valid: boolean }>,
      VerifyOtpRequest
    >({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<
      BaseApiResponse<{ message: string }>,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshAccessTokenMutation,
  useLogoutMutation,
  useGetTokensQuery,
  useGoogleAuthMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
