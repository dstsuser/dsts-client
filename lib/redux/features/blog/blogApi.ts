import { apiSlice } from './../api/api';


export const blogApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllBlogs: builder.query({
            query: ()=>({
                url:'/posts',
                method:'GET'
            })
        }),
    })
})

export const { useGetAllBlogsQuery } = blogApi