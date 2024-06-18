import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Base_URL } from '../constants'

const baseQuery = fetchBaseQuery({ baseUrl: Base_URL })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['users', 'projects'],
    endpoints: (builder) => ({})
})