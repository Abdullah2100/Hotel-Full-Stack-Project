/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";
import IErrorType from "../types/IErrorType";
import toast from "react-hot-toast";

class Util {

    static currentPage: number = 0;


    static getEnviromentVariable() {
        return process.env.Port
    }

    static handleErrorReponse(error: any, navigateDistnation?: NavigateFunction, signOut?: any) {
        const errorBody = (error.response) as IErrorType;

        let errorMessage = errorBody?.data ?? "";

        if (errorBody === undefined)
            errorMessage = error.message;
        // console.log(errorMessage);

        toast.error(`${errorMessage}`, {
            position: "bottom-right",
        })

        if (errorBody?.status === 401 && navigateDistnation != null) {
            // navigate("navigateDistnation",
            //     {
            //         replace: false
            //     });
            signOut();
            navigateDistnation('/')
        }
        return;
    }

}


export default Util