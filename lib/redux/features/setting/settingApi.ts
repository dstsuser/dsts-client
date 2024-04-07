
import { apiSlice } from './../api/api';


export const settingApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getSettingInfo : builder.query({
            query :()=>({
                url:'/setting',
                method:'GET'
            }),
        }),
        updateSettingInfo: builder.mutation({
            query : (data)=>({
                url:'/setting',
                method:'PATCH',
                body:data
            }),
        }),
    })
})

export const {  
   useGetSettingInfoQuery,
    useUpdateSettingInfoMutation
} = settingApi