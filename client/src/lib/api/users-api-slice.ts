import { createApi } from '@reduxjs/toolkit/query/react';
import type {
	BaseApiResponse,
	UserResponse,
} from '../types';
import { baseQueryWithReauth } from './base-query';

export interface UpdateUserRequest {
	firstName?: string;
	lastName?: string;
}

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<BaseApiResponse<UserResponse>, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),

		updateUser: builder.mutation<BaseApiResponse<UserResponse>, UpdateUserRequest>({
			query: (userData) => ({
				url: '/users/me',
				method: 'POST',
				body: userData,
				credentials: 'include',
			}),
			transformResponse: (response: BaseApiResponse<UserResponse>) => {
				return response;
			},
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useGetUserQuery,
	useUpdateUserMutation,
} = usersApi;
