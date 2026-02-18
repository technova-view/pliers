import { createApi } from '@reduxjs/toolkit/query/react';
import type {
	BaseApiResponse,
	UserResponse,
} from '../types';
import { baseQueryWithReauth } from './base-query';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getUser: builder.query<BaseApiResponse<UserResponse>, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
                credentials: 'include',
            }),
        }),
	}),
});

export const {
	useGetUserQuery,
} = usersApi;
