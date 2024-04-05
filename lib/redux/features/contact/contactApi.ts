import { apiSlice } from './../api/api';


export const contactApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllMessages: builder.query({
            query: ()=>({
                url:'/contact',
                method:'GET'
            })
        }),
        createContactMessage: builder.mutation({
            query: (data)=>({
                url:'/contact',
                method:'POST',
                body:data
            })
        }),
        viewMessageById: builder.mutation({
            query: (id)=>({
                url:`/contact/${id}`,
                method:'GET'
            })
        }),
    })
})

export const { useGetAllMessagesQuery, useCreateContactMessageMutation, useViewMessageByIdMutation } = contactApi