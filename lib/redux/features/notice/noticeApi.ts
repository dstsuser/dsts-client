
import { apiSlice } from './../api/api';


export const noticeApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllNotices: builder.query({
            query: ()=>({
                url:'/notices',
                method:'GET'
            })
        }),
        createNotice: builder.mutation({
            query: (data)=>({
                url:'/notices',
                method:'POST',
                body:data
            })
        }),
        viewNoticeById: builder.mutation({
            query: (id)=>({
                url:`/notices/${id}`,
                method:'GET'
            })
        }),
        
    })
})

export const { useGetAllNoticesQuery, useCreateNoticeMutation, useViewNoticeByIdMutation } = noticeApi