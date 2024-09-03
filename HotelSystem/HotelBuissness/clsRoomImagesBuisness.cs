using HotelData;
using System.Data;

namespace HotelBuisness
{
    public class clsRoomImagesBuisness
    {
        enum enMode { add, update };
        private enMode _mode { get; set; }
        public int id { get; set; }
        public string image { get; set; }
        public int roomID { get; set; }

        public clsRoomImagesBuisness()
        {
            _mode = enMode.add;
            id = 0;
            image = "";
            roomID = 0;
        }

        private clsRoomImagesBuisness(enMode mode, int id, string image, int roomID)
        {
            _mode = mode;
            this.id = id;
            this.image = image;
            this.roomID = roomID;
        }

        private static clsRoomImagesBuisness convertInlineToObject(DataRow row)
        {
            return new clsRoomImagesBuisness(
                  enMode.update,
                 id: (int)row["roomImageID"],
                 image: $"/Images/room/{(string)row["imagePath"]}",
                 roomID: (int)row["roomID"]


            );
        }


        public static clsRoomImagesBuisness? findRoomImageByID(int id)
        {
            string image = "";
            int roomID = 0;
            if (clsRoomImagesData.findRoomImage(id, ref image, ref roomID))
            {
                return new clsRoomImagesBuisness(enMode.update, id, image, roomID);
            }
            return null;
        }

        private bool _add()
        {
            this.id = clsRoomImagesData.createRoomImage(roomID, image);
            return (this.id != 0);
        }

        private bool _update()
        {
            return clsRoomImagesData.updateRoomImage(image, id);
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

        public static List<clsRoomImagesBuisness>? getRoomImages(int roomID)
        {
            var imageList = clsRoomImagesData.getRoomImagesByRoomID(roomID)
            .AsEnumerable();

            return imageList.Count() == 0 ? null : imageList
            .Select(e => convertInlineToObject(e))
            .ToList();
        }

        public static bool deleteRoomImages(int roomID)
        {
            return clsRoomImagesData.deleteRoomImages(roomID);
        }

        public static bool deleteRoomImage(int id)
        {
            return clsRoomImagesData.deleteRoomImage(id);
        }


        /*
                public static bool isRoomTypeExistByimage(string image)
                {
                    return clsRoomImagesData.isRoomTypeExistByimage(image);
                }
                public static bool isRoomTypeExistByID(int id)
                {
                    return clsRoomImagesData.isRoomTypeExistByID(id);
                }
        */

    }
}
