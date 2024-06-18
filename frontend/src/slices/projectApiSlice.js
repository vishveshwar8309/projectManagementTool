import { apiSlice } from "./apiSlice";
import { PROJECT_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (data) => ({
                url: PROJECT_URL,
                method: 'POST',
                body: data,
            }),
        }),
        getProjectDetails: builder.mutation({
            query: (projectIds) => ({
                url: `${PROJECT_URL}/projects`,
                method: 'POST',
                body: projectIds
            }),
            keepUnusedDataFor: 3600,
            providesTags: ['projects']
        })
    })
})

export const { useCreateProjectMutation, useGetProjectDetailsMutation } = userApiSlice
