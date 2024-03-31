
import { apiSlice } from './../api/api';

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getCommitteeList: builder.query({
            query :()=>({
                url:'/committee',
                method:'GET'
            }),
        }),
    })
})

export const {useGetCommitteeListQuery} = authApi