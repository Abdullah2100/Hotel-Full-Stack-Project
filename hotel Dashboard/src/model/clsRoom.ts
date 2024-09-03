import clsAdmin from "./clsAdmin";
import clsRoomImage from "./clsRoomImage";
import clsRoomType from "./clsRoomType";

class Room {
    id: number;
    capacity: number;
    bedNumber: number;
    pricePerDay: number;
    state: number;
    addById: number;
    addByInfo: clsAdmin;
    floorNumber: number;
    title: string;
    description: string;
    createDate: Date;
    isRent: boolean;

    roomTypeId: number;
    roomTypeInfo: clsRoomType;
    roomImages: clsRoomImage[];
    constructor(
        id: number,
        capacity: number,
        bedNumber: number,
        pricePerDay: number,
        state: number,
        addBy: number,
        addByInfo: clsAdmin,
        floorNumber: number,
        title: string,
        description: string,
        createDate: Date,
        roomTypeId: number,
        roomTypeInfo: clsRoomType,
        roomImages: clsRoomImage[],
        isRent: boolean
    ) {
        this.id = id;
        this.capacity = capacity;
        this.bedNumber = bedNumber;
        this.pricePerDay = pricePerDay;
        this.state = state;
        this.addById = addBy;
        this.addByInfo = addByInfo;
        this.floorNumber = floorNumber;
        this.title = title;
        this.description = description;
        this.roomTypeId = roomTypeId;
        this.roomTypeInfo = roomTypeInfo;
        this.roomImages = roomImages;
        this.createDate = createDate;
        this.isRent = isRent;
    }
}
export default Room;