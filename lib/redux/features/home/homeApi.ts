
import { apiSlice } from './../api/api';


export const homeApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getHeroBanner: builder.query({
            query: ()=>({
                url:'/hero-images',
                method:'GET'
            })
        }),
        postHeroBanner: builder.mutation({
            query: (data)=>({
                url:'/hero-images',
                method:'POST',
                body:data
            })
        }),
        updateHeroBannerById: builder.mutation({
            query: ({id,data})=>({
                url:`/hero-images/${id}`,
                method:'PATCH',
                body:data
            })
        }),
        deleteHeroBannerById: builder.mutation({
            query: (id)=>({
                url:`/hero-images/${id}`,
                method:'DELETE'
            })
        })
    })
})

export const { useGetHeroBannerQuery, usePostHeroBannerMutation, useUpdateHeroBannerByIdMutation, useDeleteHeroBannerByIdMutation } = homeApi