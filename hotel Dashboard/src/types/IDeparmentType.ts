import clsDepartment from "../model/clsDepartment";

interface IDeparmentType {
    depatmentItems: clsDepartment[]
    getDepartment: () => void;
    addToDepartment: (data: clsDepartment) => void;
}
export default IDeparmentType;