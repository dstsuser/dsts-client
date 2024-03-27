import { baseUrl } from "@/lib/config";
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";

type HeadersFunction = (headers: Headers, { getState, endpoint }: { getState: any; endpoint: string }) => Promise<Headers>;

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: async (headers: Headers, { getState, endpoint }: { getState: any; endpoint: string }) => {
            const token = getState()?.auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
});
