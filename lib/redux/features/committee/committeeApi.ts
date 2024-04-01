
import { apiSlice } from './../api/api';

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getCommitteeList: builder.query({
            query :()=>({
                url:'/committee',
                method:'GET'
            }),
        }),
        createCommittee: builder.mutation({
            query : (data)=>({
                url:'/committee',
                method:'POST',
                body:data
            }),
        }),
        addMemberToCommittee: builder.mutation({
            query : ({id,data})=>({
                url:`/committee/${id}/members`,
                method:'PUT',
                body:data
            }),
        }),
        getCommitteePositions: builder.query({
            query :()=>({
                url:'committee-positions',
                method:'GET'
            }),
        }),
        createCommitteePosition: builder.mutation({
            query : (data)=>({
                url:'/committee-positions',
                method:'POST',
                body:data
            }),
        }),
    })
})

export const {useGetCommitteeListQuery, useAddMemberToCommitteeMutation, useCreateCommitteeMutation, useCreateCommitteePositionMutation, useGetCommitteePositionsQuery, useLazyGetCommitteeListQuery, useLazyGetCommitteePositionsQuery } = authApi