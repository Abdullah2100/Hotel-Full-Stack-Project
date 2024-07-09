/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { create } from 'zustand';
import clsLoginRequest from '../model/clsLoginRequest';
import enAuthReqst from '../types/enAuthReqst';
import axios from 'axios';
import AdminServiceTypes from '../types/IAdminServiceTypes';
import clsAdminData from '../global/clsAdminData';
const Adminservices = create<AdminServiceTypes>((set) => ({

    authRequestState: enAuthReqst.none,

    login: async (reqestData: clsLoginRequest): Promise<string> => {
        set({ authRequestState: enAuthReqst.loading });
        console.log()

        const result = await axios.
            post(
                `${process.env.apiUrl}/login`, reqestData,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )

        if (result.status != 200) {
            set({ authRequestState: enAuthReqst.error });
        }
        else {
            set({ authRequestState: enAuthReqst.complate });
        }
        const data = await result.data.tokenData;
        return data;
    },

    getAdminData: async (token: string): Promise<void> => {
        const request = await axios.get(
            `${process.env.apiUrl}/getData`, {
            headers: {
                "Content-type": "application/json;",
                'Authorization': token
            },
            withCredentials: true

        });

        const response = request?.data;
        clsAdminData.adminLineToObject(response);

    }
    ,
    updateAdminData: async (adminData: FormData, token: string): Promise<string> => {

        set({ authRequestState: enAuthReqst.loading });
        console.log()

        const result = await axios.
            post(
                `${process.env.apiUrl}/update`, adminData,
                {
                    headers: {
                        "Content-type": "multipart/form-data"
                        , 'Authorization': token

                    },
                    withCredentials: true
                },

            )

        if (result.status != 200) {
            set({ authRequestState: enAuthReqst.error });
        }
        else {
            set({ authRequestState: enAuthReqst.complate });
        }

        return result.data;

    }
}));

export default Adminservices;