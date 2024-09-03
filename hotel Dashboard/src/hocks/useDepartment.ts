import axios from "axios";
import clsDepartment from "../model/clsDepartment";
import { useMutation, useQuery, useQueryClient } from "react-query";




export const useGetDepartment = (token: string) => {

    return useQuery({
        queryKey: ['departments'],
        queryFn: async () =>
            await axios.get<clsDepartment[]>(
                `${process.env.apiUrl}/department/all`, {

                headers: {
                    "Content-type": "application/json;",
                    'Authorization': token
                }
            })
    })

}



export const useCreateDepartment = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (name: string,) =>
            await axios.post(
                `${process.env.apiUrl}/department/add`, null, {
                params: { name },
                headers: {
                    'Authorization': token
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries('departments')
        }
    })

}

export const useDeleteDepartment = (token: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) =>
            await axios.delete(
                `${process.env.apiUrl}/department/${id}`, {
                headers: {
                    'Authorization': token
                }
            }),
        onSuccess: () => {
            queryClient.invalidateQueries('departments')
        }
    })

}

export const UseupdateDepartment = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (department: clsDepartment,) =>
            await axios.put(
                `${process.env.apiUrl}/department`, {
                id: department.id,
                name: department.name
            }, {
                headers: {
                    "Content-type": "application/json;",
                    'Authorization': token
                }
            })
        , onSuccess: () => {
            queryClient.invalidateQueries('departments')
        }
    })

}
