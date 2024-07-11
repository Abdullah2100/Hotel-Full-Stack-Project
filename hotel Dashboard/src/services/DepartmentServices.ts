import { create } from "zustand";
import IDeparmentType from "../types/IDeparmentType";
import axios from "axios";
import clsDepartment from "../model/clsDepartment";
import enState from "../types/enState";



const DepartmentServices = create<IDeparmentType>((set) => ({
    departmentState: enState.loading,
    depatmentItems: [],
    getDepartment: async (token: string) => {
        // set({ departmentState: enState.loading })

        await axios.get<clsDepartment[]>(
            `${process.env.apiUrl}/department/all`, {

            headers: {
                "Content-type": "application/json;",
                'Authorization': token
            }


        }).then((data) => {

            set({ depatmentItems: [] })
            set({ depatmentItems: data.data })
            set({ departmentState: enState.complate })

        }).catch((e) => {

            console.log(e.message)
            set({ departmentState: enState.error })

        });

    },

    addToDepartment: (dataHolder: clsDepartment) => {
        set((data) => ({ depatmentItems: [...data.depatmentItems, dataHolder] }))
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
        // set({ departmentState: enState.loading })

        const result = await axios.delete(
            `${process.env.apiUrl}/department/${id}`, {

            headers: {

                'Authorization': token
            }


        });
        // .then((data) => {

        //     set({ depatmentItems: [] })
        //     set({ depatmentItems: data.data })
        //     set({ departmentState: enState.complate })

        // }).catch((e) => {

        //     console.log(e.message)
        //     set({ departmentState: enState.error })

        // });
        return result.data;

    },

    updateDepartment: async (department: clsDepartment, token: string): Promise<string> => {
        // const departmentName = department.name;

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