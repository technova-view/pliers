import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseApiResponse, UserResponse, AdminUserQueryParams, PaginatedUsersResponse, UpdateUserStatusRequest } from "../types";
import { baseQueryWithReauth } from "./base-query";
import { UserStatus } from "../enums";

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getUser: builder.query<BaseApiResponse<UserResponse>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<
      BaseApiResponse<UserResponse>,
      UpdateUserRequest
    >({
      query: (userData) => ({
        url: "/users/me",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      transformResponse: (response: BaseApiResponse<UserResponse>) => {
        return response;
      },
      invalidatesTags: ["User"],
    }),

    // Admin endpoints
    getAllUsers: builder.query<BaseApiResponse<PaginatedUsersResponse>, AdminUserQueryParams>({
      query: (params) => ({
        url: "/users/admin/all",
        method: "GET",
        credentials: "include",
        params,
      }),
      providesTags: ["Users"],
    }),

    updateUserStatus: builder.mutation<BaseApiResponse<UserResponse>, UpdateUserStatusRequest>({
      query: ({ userId, status }) => ({
        url: "/users/admin/status",
        method: "PUT",
        body: { userId, status },
        credentials: "include",
      }),
      transformResponse: (response: BaseApiResponse<UserResponse>) => {
        return response;
      },
      invalidatesTags: ["Users", "User"],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useGetAllUsersQuery, useUpdateUserStatusMutation } = usersApi;
