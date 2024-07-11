import clsDepartment from "./clsDepartment";
import clsPerson from "./clsPerson";

class clsAdmin {
    id: number;
    userName: string;
    department: clsDepartment;
    person: clsPerson
    address: string
    phone: string
    image: string
    isBlock: boolean


    constructor() {
        this.id = 0;
        this.userName = "";
        this.department = new clsDepartment(0, '');
        this.person = new clsPerson;
        this.address = "";
        this.phone = "";
        this.image = "";
        this.isBlock = false;
    }


}

export default clsAdmin;