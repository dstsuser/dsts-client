import { apiSlice } from './../api/api';


export const facesApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllFaces: builder.query({
            query: ()=>({
                url:'/faces',
                method:'GET'
            })
        }),
    })
})

export const { useGetAllFacesQuery } = facesApi