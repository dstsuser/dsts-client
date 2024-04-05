
import { apiSlice } from './../api/api';

export const aboutUsApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAboutUs: builder.query({
            query :()=>({
                url:'/about-us',
                method:'GET'
            }),
        }),
        getActiveAboutUs: builder.query({
            query :()=>({
                url:'/about-us/active',
                method:'GET'
            }),
        }),
        updateAboutUs: builder.mutation({
            query : (data)=>({
                url:'/about-us',
                method:'PUT',
                body:data
            }),
        }),
        createAboutUs: builder.mutation({
            query : (data)=>({
                url:'/about-us',
                method:'POST',
                body:data
            }),
        }),
        deleteAboutUsById: builder.mutation({
            query : (id)=>({
                url:`/about-us/${id}`,
                method:'DELETE'
            }),
        }),
    })
})

export const {
    useGetAboutUsQuery,
    useCreateAboutUsMutation,
    useUpdateAboutUsMutation,
    useDeleteAboutUsByIdMutation,
    useGetActiveAboutUsQuery
} = aboutUsApi