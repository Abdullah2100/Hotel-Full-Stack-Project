import { create } from "zustand";
import axios from "axios";
import enState from "../types/enState";
import IRoomType from "../types/IRoomType copy";
import clsRoomType from "../model/clsRoomType";



const RoomTypeServices = create<IRoomType>((set) => ({
    roomTypeState: enState.loading,
    roomTypeItems: [],

    changeRoomType: (state: enState) => {

        set({ roomTypeState: state })

    },
    getRoomType: async (token: string): Promise<clsRoomType[]> => {
        // set({ roomTypeItems: enState.loading })

        const result = await axios.get<clsRoomType[]>(
            `${process.env.apiUrl}/roomType/all`, {

            headers: {
                "Content-type": "application/json;",
                'Authorization': token
            }


        })


        return result.data;

    },

    addToRoomType: (dataHolder: clsRoomType) => {
        set((data) => ({ roomTypeItems: [...data.roomTypeItems, dataHolder] }))
    },
    addToRoomTypes: (dataHolder: clsRoomType[]) => {
        set(({ roomTypeItems: dataHolder }))
    },
    createRoomType: async (name: string, token: string): Promise<string> => {


        const response = await axios.post(
            `${process.env.apiUrl}/roomType`, null, {
            params: { name },
            headers: {
                'Authorization': token

            },

        });
        return response.data;
    },

    deleteRoomType: async (id: number, token: string): Promise<string> => {

        const result = await axios.delete(
            `${process.env.apiUrl}/roomType/${id}`, {

            headers: {

                'Authorization': token
            }


        });
        return result.data;

    },

    updateRoomType: async (roomType: clsRoomType, token: string): Promise<string> => {

        const result = await axios.put(
            `${process.env.apiUrl}/roomType`, {
            id: roomType.id,
            name: roomType.name
        }, {

            headers: {
                "Content-type": "application/json;",
                'Authorization': token
            }


        });
        return result.data;

    }

}));

export default RoomTypeServices;