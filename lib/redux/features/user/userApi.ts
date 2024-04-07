import { JwtPayload, jwtDecode } from 'jwt-decode';
import { apiSlice } from './../api/api';


export const userApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllUsers: builder.query({
            query: ()=>({
                url:'/users',
                method:'GET'
            })
        }),
        postUser: builder.mutation({
            query: (data)=>({
                url:'/users',
                method:'POST',
                body:data
            })
        }),
        getUserById: builder.query({
            query: (id)=>({
                url:`/users/${id}`,
                method:'GET'
            })
        }),
        patchUserById: builder.mutation({
            query: ({id,data})=>({
                url:`/users/${id}/update`,
                method:'PATCH',
                body:data
            })
        }),
        patchUserByUser: builder.mutation({
            query: ({data})=>({
                url:`/users/update`,
                method:'PATCH',
                body:data
            })
        }),
        uploadProfileImage: builder.mutation({
            query: ({id,form})=>({
                url:`/users/${id}/upload-avatar`,
                method:'PATCH',
                body:form
            })
        }),
        deleteUserById: builder.mutation({
            query: (id)=>({
                url:`/users/${id}`,
                method:'DELETE'
            })
        }),
        
    })
})

export const {useGetAllUsersQuery, usePostUserMutation, useGetUserByIdQuery, usePatchUserByIdMutation, useUploadProfileImageMutation, usePatchUserByUserMutation,useDeleteUserByIdMutation } = userApi