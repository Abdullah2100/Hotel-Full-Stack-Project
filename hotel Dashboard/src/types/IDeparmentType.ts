import clsDepartment from "../model/clsDepartment";
import enState from "./enState";

interface IDeparmentType {
    departmentState: enState,
    depatmentItems: clsDepartment[]
    getDepartment: (token: string) => void;
    createDepartment: (name: string, token: string) => Promise<string>;
    addToDepartment: (data: clsDepartment) => void;
    deleteDepartment: (id: number, token: string) => Promise<string>;
    updateDepartment: (department: clsDepartment, token: string) => Promise<string>;
}
export default IDeparmentType;