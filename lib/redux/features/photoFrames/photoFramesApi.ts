
import { apiSlice } from './../api/api';


export const photoFramesApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getPhotoFrames: builder.query({
            query :()=>({
                url:'/photo-frames',
                method:'GET'
            }),
        }),
        updatePhotoFrames: builder.mutation({
            query : (data)=>({
                url:'/photo-frames',
                method:'PUT',
                body:data
            }),
        }),
        createPhotoFrames: builder.mutation({
            query : (data)=>({
                url:'/photo-frames',
                method:'POST',
                body:data
            }),
        }),
        deletePhotoFramesById: builder.mutation({
            query : (id)=>({
                url:`/photo-frames/${id}`,
                method:'DELETE'
            }),
        }),
       
    })
})

export const {  
    useGetPhotoFramesQuery,
    useCreatePhotoFramesMutation,
    useUpdatePhotoFramesMutation,
    useDeletePhotoFramesByIdMutation
} = photoFramesApi