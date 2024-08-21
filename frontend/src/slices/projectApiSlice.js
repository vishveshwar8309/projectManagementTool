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
        getProject: builder.mutation({
            query: (projectId) => ({
                url: `${PROJECT_URL}/getproject`,
                method: 'POST',
                body: projectId,
            })
        }),
        getProjectDetails: builder.mutation({
            query: (projectIds) => ({
                url: `${PROJECT_URL}/projectdetails`,
                method: 'POST',
                body: projectIds
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const { useCreateProjectMutation, useGetProjectMutation, useGetProjectDetailsMutation } = userApiSlice
