import clsLoginRequest from "../model/clsLoginRequest";
import enAuthReqst from "./enState";

interface IAdminServiceTypes {
    authRequestState: enAuthReqst,
    login: (reqestData: clsLoginRequest) => Promise<string>;
    getAdminData: (token: string) => Promise<void>;
    updateAdminData: (adminData: FormData, token: string) => Promise<string>;

}


export default IAdminServiceTypes;