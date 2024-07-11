/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import clsAdmin from "../model/clsAdmin";
import clsDepartment from "../model/clsDepartment";
import clsPerson from "../model/clsPerson";

class clsAdminData {
    static adminDataHolder: clsAdmin
    // = new clsAdmin


    static adminLineToObject(adminDataHolder: any) {
        let deparmtent = new clsDepartment(0, '');
        deparmtent.id = adminDataHolder.departmentData.id;
        deparmtent.name = adminDataHolder.departmentData.name;
        let personInfo = new clsPerson;
        personInfo.firstName = adminDataHolder.personalData.firstName;
        personInfo.brithDay = adminDataHolder.personalData.brithDay;
        personInfo.lastName = adminDataHolder.personalData.lastName;
        personInfo.nationalNo = adminDataHolder.personalData.nationalNo;
        let adminData = new clsAdmin();
        adminData.id = adminDataHolder.id;
        adminData.address = adminDataHolder.address;
        adminData.userName = adminDataHolder.userName;
        adminData.address = adminDataHolder.address;
        adminData.phone = adminDataHolder.phone;
        if (adminDataHolder.image != '')
            adminData.image = process.env.apiUrl + "/" + adminDataHolder.image;
        adminData.person = personInfo;
        adminData.department = deparmtent;
        this.adminDataHolder = adminData;
    }
}

export default clsAdminData