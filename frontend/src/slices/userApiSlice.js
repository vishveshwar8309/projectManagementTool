import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signin`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 3600,
            providesTags: ['users']
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 3600,
            providesTags: ['users']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            })
        }),
        getEmployersData: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/employee`,
                body: data,
                method: 'POST'
            }),
            keepUnusedDataFor: 600,
        })
    })
})

export const { useRegisterUserMutation, useLogoutUserMutation, useLoginUserMutation, useGetEmployersDataMutation } = userApiSlice;