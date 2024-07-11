/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { create } from 'zustand';
import clsLoginRequest from '../model/clsLoginRequest';
import enState from '../types/enState';
import axios from 'axios';
import AdminServiceTypes from '../types/IAdminServiceTypes';
import clsAdminData from '../global/clsAdminData';
const Adminservices = create<AdminServiceTypes>((set) => ({

    authRequestState: enState.none,

    login: async (reqestData: clsLoginRequest): Promise<string> => {
        set({ authRequestState: enState.loading });
        console.log()

        const result = await axios.
            post(
                `${process.env.apiUrl}/employee/login`, reqestData,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        , "Access-Control-Allow-Origin": "*"
                    }
                }
            )

        if (result.status != 200) {
            set({ authRequestState: enState.error });
        }
        else {
            set({ authRequestState: enState.complate });
        }
        const data = await result.data.tokenData;
        return data;
    },

    getAdminData: async (token: string): Promise<void> => {
        const request = await axios.get(
            `${process.env.apiUrl}/employee`, {
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

        set({ authRequestState: enState.loading });
        console.log()

        const result = await axios.
            put(
                `${process.env.apiUrl}/employee`, adminData,
                {
                    headers: {
                        "Content-type": "multipart/form-data"
                        , 'Authorization': token

                    },
                    withCredentials: true
                },

            )

        if (result.status != 200) {
            set({ authRequestState: enState.error });
        }
        else {
            set({ authRequestState: enState.complate });
        }

        return result.data;

    }
}));

export default Adminservices;