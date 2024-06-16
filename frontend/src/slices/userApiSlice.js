import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const { useRegisterUserMutation } = userApiSlice;