import clsRoomType from "../model/clsRoomType";
import enState from "./enState";

interface IRoomType {
    roomTypeState: enState,
    roomTypeItems: clsRoomType[]
    getRoomType: (token: string) => Promise<clsRoomType[]>;
    createRoomType: (name: string, token: string) => Promise<string>;
    addToRoomType: (data: clsRoomType) => void;
    deleteRoomType: (id: number, token: string) => Promise<string>;
    updateRoomType: (roomType: clsRoomType, token: string) => Promise<string>;
    addToRoomTypes: (data: clsRoomType[]) => void;
    changeRoomType: (state: enState) => void
}
export default IRoomType;