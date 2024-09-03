import axios from "axios";
import clsRoomType from "../model/clsRoomType";
import { useMutation, useQuery } from "react-query";



export const useGetRoomType = (token: string) => {
    return useQuery({
        queryKey: ['roomTypes'],
        queryFn: async () =>
            await axios.get<clsRoomType[]>(
                `${process.env.apiUrl}/roomType/all`, {
                headers: {
                    "Content-type": "application/json;",
                    'Authorization': token
                }
            }),

    })

}


export const useGetRoomTypeByID = (id: number, token: string) => {
    return useQuery(
        {
            queryKey: ['roomTypes', id],
            queryFn: async () =>
                await axios.get<clsRoomType>(
                    `${process.env.apiUrl}/roomType/${id}`, {
                    headers: {
                        "Content-type": "application/json;",
                        'Authorization': token
                    }
                }),
        }
    )
}


export const useCreateRoomType = (token: string) => useMutation({
    mutationFn: async (name: string) =>
        await axios.post(
            `${process.env.apiUrl}/roomType`, null, {
            params: { name },
            headers: {
                'Authorization': token

            },

        })
})


export const useDeleteRoomType = (token: string) => useMutation({
    mutationFn: async (id: number,) =>
        await axios.delete(
            `${process.env.apiUrl}/roomType/${id}`, {

            headers: {

                'Authorization': token
            }
        })
})


export const useUpdateRoomType = (token: string) => useMutation({
    mutationFn: async (roomType: clsRoomType) =>
        await axios.delete(
            `${process.env.apiUrl}/roomType/${roomType.id}`, {

            headers: {

                'Authorization': token
            }
        })
})

