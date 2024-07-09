import { create } from "zustand";
import IDeparmentType from "../types/IDeparmentType";
import axios from "axios";
import clsDepartment from "../model/clsDepartment";



const DepartmentServices = create<IDeparmentType>((set) => ({
    depatmentItems: [],
    getDepartment: async () => {


        await axios.get<clsDepartment[]>(
            `${process.env.apiUrl}/Department`, {

            headers: {
                "Content-type": "application/json;"
            },

        }).then((data) => {
            set({ depatmentItems: [] })
            set({ depatmentItems: data.data })

        }).catch((e) => {
            console.log(e.message)
        });

    }
    ,
    addToDepartment: (dataHolder: clsDepartment) => {
        set((data) => ({ depatmentItems: [...data.depatmentItems, dataHolder] }))
    }

}));

export default DepartmentServices;