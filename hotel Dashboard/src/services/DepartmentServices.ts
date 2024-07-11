import { create } from "zustand";
import IDeparmentType from "../types/IDeparmentType";
import axios from "axios";
import clsDepartment from "../model/clsDepartment";
import enState from "../types/enState";
import clsRoomType from "../model/clsRoomType";



const DepartmentServices = create<IDeparmentType>((set) => ({
    departmentState: enState.loading,
    depatmentItems: [],
    changeDeparmtmentState: (state: enState) => {
        set({ departmentState: state })
    },
    getDepartment: async (token: string): Promise<clsDepartment[]> => {

        const result = await axios.get<clsDepartment[]>(
            `${process.env.apiUrl}/department/all`, {

            headers: {
                "Content-type": "application/json;",
                'Authorization': token
            }
        })
        return result.data
    },

    addToDepartment: (dataHolder: clsDepartment) => {
        set((data) => ({ depatmentItems: [...data.depatmentItems, dataHolder] }))
    },
    addToDepartments: (deparmtments: clsRoomType[]) => {
        set({ depatmentItems: deparmtments })
    },
    createDepartment: async (name: string, token: string): Promise<string> => {
        const response = await axios.post(
            `${process.env.apiUrl}/department/add`, null, {
            params: { name },
            headers: {
                'Authorization': token
            },
        });
        return response.data;
    },

    deleteDepartment: async (id: number, token: string): Promise<string> => {
        const result = await axios.delete(
            `${process.env.apiUrl}/department/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        return result.data;
    },

    updateDepartment: async (department: clsDepartment, token: string): Promise<string> => {

        const result = await axios.put(
            `${process.env.apiUrl}/department`, {
            id: department.id,
            name: department.name
        }, {
            headers: {
                "Content-type": "application/json;",
                'Authorization': token
            }
        });
        return result.data;
    }

}));

export default DepartmentServices;