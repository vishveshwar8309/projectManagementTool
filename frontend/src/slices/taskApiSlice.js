import { apiSlice } from "./apiSlice";
import { TASK_URL } from "../constants";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/create`,
                method: 'POST',
                body: data,
            })
        }),

        getTasks: builder.query({
            query: (data) => ({
                url: `${TASK_URL}/${data.employeeId}/${data.projectId}`,
            })
        }),

        getATask: builder.query({
            query: (data) => ({
                url: `${TASK_URL}/${data.taskId}`
            })
        }),

        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/updatetask`,
                method: "PUT",
                body: data
            })
        })
    })
})

export const { useCreateTaskMutation, useGetTasksQuery, useGetATaskQuery, useUpdateTaskMutation } = taskApiSlice;