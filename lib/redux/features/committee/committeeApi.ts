
import { apiSlice } from './../api/api';

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getCommitteeList: builder.query({
            query :()=>({
                url:'/committee',
                method:'GET'
            }),
        }),
        getCommitteeById: builder.query({
            query : (id)=>({
                url:`/committee/${id}`,
                method:'GET'
            }),
        }),
        getCommitteeByProperty: builder.query({
            query : ({key,value})=>({
                url:`/committee/${key}/${value}`,
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

export const {useGetCommitteeListQuery, useAddMemberToCommitteeMutation, useCreateCommitteeMutation, useCreateCommitteePositionMutation, useGetCommitteePositionsQuery, useGetCommitteeByIdQuery, useGetCommitteeByPropertyQuery } = authApi