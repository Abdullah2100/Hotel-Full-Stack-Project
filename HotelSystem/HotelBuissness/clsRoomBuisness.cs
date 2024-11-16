using HotelData;
using HotelData.Dto;
using System;
using System.Data;

namespace HotelBuisness
{
    public class clsRoomBuisness
    {

        public enum enState { none, booking, closing, outServices }

        private enum enMode { add, update }
        private enMode _mode { get; set; }

        public int id { get; set; }
        public Int16 capacity { get; set; }
        public Int16 bedNumber { get; set; }
        public double pricePerDay { get; set; }
        // public enState state { get; set; }
        public int? addBy { get; set; }
        public short floorNumber { get; set; }
        public DateTime createdDate { get; set; }
        public int roomTypeID { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public bool isRent { get; set; }

        public clsRoomTypeBuisness? roomTypeInfo { get; set; }

        public clsEmployeeDto? addByInfo { get; set; }

        public List<clsRoomImagesBuisness>? roomImages { get; set; }
        public clsRoomBuisness()
        {
            this.id = 0;
            this.capacity = 0;
            this.bedNumber = 0;
            this.pricePerDay = 0;
            // this.state = enState.none;
            this.addBy = null;
            this.floorNumber = 0;
            this.createdDate = DateTime.Now;
            this._mode = enMode.add;
            this.roomTypeID = 0;
            this.title = "";
            this.description = "";
            this.isRent = false;
        }

        private clsRoomBuisness(
            enMode mode,
            int id,
            Int16 capacity,
             Int16 bedNumber,
              double pricePerDay,
               //   enState state,
               int? addBy,
               short floorNumber,
                DateTime createdDate,
                 int roomTypeID,
                 string title,
                 string description,
                 bool isRent
                 )

        {
            this._mode = mode;
            this.id = id;
            this.capacity = capacity;
            this.bedNumber = bedNumber;
            this.pricePerDay = pricePerDay;
            this.addBy = addBy;
            this.floorNumber = floorNumber;
            this.roomTypeID = roomTypeID;
            this.isRent = isRent;
            if (addBy != null)
                addByInfo = clsEmployeeBuisness.findEmployeeByID(addBy ?? 0);
            // this.state = state;
            this.createdDate = createdDate;
            this.roomTypeID = roomTypeID;
            // this.roomTypeInfo = roomTypeInfo;
            if (roomTypeID != 0)
                this.roomTypeInfo = clsRoomTypeBuisness.findRoomTypeByID(roomTypeID);
            this.description = description;
            this.title = title;
            this.roomImages = clsRoomImagesBuisness.getRoomImages(id);
        }

        private static clsRoomBuisness convertInlineToObject(DataRow row)
        {
            return new clsRoomBuisness(
                    enMode.update,
                                  id: (int)row["roomID"],
                                  capacity: (Int16)row["capacity"],
                                  bedNumber: (Int16)row["bedNumber"],
                                  pricePerDay: (double)row["pricePerDay"],
                                  addBy: row["addBy"] != DBNull.Value ? (int)row["addBy"] : 0,
                                  floorNumber: (short)row["floorNumber"],
                                  roomTypeID: (int)row["roomTypeID"],
                                  createdDate: (DateTime)row["createdDate"],
                                  title: (string)row["title"],
                                  description: (string)row["description"],
                                  isRent: (bool)row["isRent"]
              //   state: (enState)row["state"]

              );


        }


        public static clsRoomBuisness? getRoomByID(int id)
        {
            Int16 capacity = 0;
            Int16 bedNumber = 0;
            double pricePerDay = 0.0;
            Int16 state = 0;
            int? addBy = null;
            short floorNumber = 0;
            int roomTypeID = 0;
            DateTime createdDate = DateTime.Now;
            string title = "";
            string description = "";
            bool isRent = false;

            if (clsRoomData.findRoomByID(
                id,
                 ref capacity,
                 ref bedNumber,
                 ref pricePerDay,
                  ref state,
                 ref addBy,
                 ref floorNumber,
                 ref createdDate,
                 ref roomTypeID,
                 ref title,
                 ref description,
                 ref isRent))
            {
                return new clsRoomBuisness(
                    enMode.update,
                    id,
                    capacity,
                    bedNumber,
                    pricePerDay,
                    // (enState)state,
                    addBy,
                    floorNumber,
                    createdDate,
                    roomTypeID,
                    title,
                    description,
                    isRent
                    );
            }

            return null;
        }


        private bool _add()
        {
            this.id = clsRoomData.createRoom(
                capacity,
                bedNumber,
                pricePerDay,
                 //  (Int16)(state),
                 addBy,
                 floorNumber,
                 roomTypeID,
                 title,
                 description);

            return (this.id != 0);
        }

        private bool _update()
        {
            return clsRoomData.UpdateRoom(
                id,
                capacity,
                bedNumber,
                pricePerDay,
                  //    (Int16)state,
                  addBy,
                  floorNumber,
                  roomTypeID,
                  title,
                  description);
        }

        public bool save()
        {
            switch (_mode)
            {
                case enMode.add:
                    {
                        if (_add())
                        {
                            _mode = enMode.update;
                            return true;
                        }
                        return false;
                    }
                case enMode.update:
                    {
                        if (_update())
                            return true;
                        return false;
                    }
            }
            return false;
        }


        public static List<clsRoomBuisness>? getRooms()
        {
            var rooms = clsRoomData
            .getRooms()
            .AsEnumerable();
            return rooms.Count() == 0 ? null : rooms
            .Select(e => convertInlineToObject(e))
            .ToList();
        }

        public static bool deleteRoom(int id)
        {
            if (clsRoomData.deleteRoom(id))
            {

                return clsRoomImagesBuisness.deleteRoomImages(id);
            }
            return false;
        }

        public bool updateRoomState(enState state)
        {
            return clsRoomData.UpdateRoom(
                id,
                 capacity,
                 bedNumber,
                  pricePerDay,
                   //    (Int16)state,
                   addBy,
                   floorNumber,
                   roomTypeID,
                   title,
                   description);
        }



    }

}
