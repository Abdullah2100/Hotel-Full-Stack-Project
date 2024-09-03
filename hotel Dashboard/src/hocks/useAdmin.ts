/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useMutation, useQuery } from 'react-query';
import clsLoginRequest from '../model/clsLoginRequest';
import axios from 'axios';
import clsAdmin from '../model/clsAdmin';




export const useLogin = () => useMutation({
    mutationFn: async (reqestData: clsLoginRequest) =>
        await axios.
            post(
                `${process.env.apiUrl}/employee/login`, reqestData,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        , "Access-Control-Allow-Origin": "*"
                    }
                }
            )
})


export const useAdminData = (token: string) => {
    return useQuery({
        queryKey: ['adminData'],
        queryFn: async () =>
            await axios.get<clsAdmin>(
                `${process.env.apiUrl}/employee`, {
                headers: {
                    "Content-type": "application/json;",
                    'Authorization': token
                },
                withCredentials: true
            })
    })

}

export const useUpdateAdminData = (token: string) => useMutation({
    mutationFn: async (adminData: FormData) =>
        await await axios.
            put(
                `${process.env.apiUrl}/employee`, adminData,
                {
                    headers: {
                        "Content-type": "multipart/form-data"
                        , 'Authorization': token

                    },
                    withCredentials: true
                },

            )
})




