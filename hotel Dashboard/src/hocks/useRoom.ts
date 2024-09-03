import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import clsRoom from "../model/clsRoom";


export const useGetRooms = (token: string) => {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: async () =>
            await axios.get<clsRoom[]>(
                `${process.env.apiUrl}/rooms`, {
                headers: {
                    "Content-type": "application/json;",
                    'Authorization': token
                }
            }),

    })
}



export const useGetRoomByID = (roomID: number, token: string) => {
    return useQuery({
        queryKey: ['room', roomID],
        queryFn: async () =>
            await axios.get<clsRoom>(
                `${process.env.apiUrl}/room/${roomID}`, {
                headers: {
                    "Content-type": "application/json;",
                    'Authorization': token
                }
            }),

    })
}


export const useCreateRoom = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData,) =>
            await axios.post(
                `${process.env.apiUrl}/room`, data, {
                headers: {
                    "Content-type": "multipart/form-data;",
                    'Authorization': token
                }
            }
            )
        ,
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms'])
        }
    })
}


export const useUpdateRoom = (token: string, roomID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) =>
            await axios.put(
                `${process.env.apiUrl}/room/${roomID}`, data, {
                headers: {
                    "Content-type": "multipart/form-data;",
                    'Authorization': token
                }
            }
            )
        ,
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms'])
        }
    })
}



export const useDeleteRoom = (token: string,) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (roomID: number) =>
            await axios.delete(
                `${process.env.apiUrl}/room/${roomID}`, {
                headers: {
                    "Content-type": "multipart/form-data;",
                    'Authorization': token
                }
            }
            )
        ,
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms'])
        }
    })
}


