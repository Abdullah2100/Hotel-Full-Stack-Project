using HotelData;
using System.Data;

namespace HotelBuisness
{
    public class clsRoomTypeBuisness
    {
        enum enMode { add, update };
        private enMode _mode { get; set; }
        public int id { get; set; }
        public string name { get; set; }

        public clsRoomTypeBuisness()
        {
            _mode = enMode.add;
            id = 0;
            name = "";
        }

        private clsRoomTypeBuisness(enMode mode, int id, string name)
        {
            _mode = mode;
            this.id = id;
            this.name = name;
        }

        private static clsRoomTypeBuisness convertInlineToObject(DataRow row)
        {
            return new clsRoomTypeBuisness(
                  enMode.update,
                 id: (int)row["roomTypeID"],
                 name: (string)row["name"]
            );
        }


        public static clsRoomTypeBuisness findRoomTypeByID(int id)
        {
            string name = "";
            if (clsRoomTypeData.findRoomType(id, ref name))
            {
                return new clsRoomTypeBuisness(enMode.update, id, name);
            }
            return null;
        }

        public static clsRoomTypeBuisness findRoomTypeByName(string name)
        {
            int id = 0;
            if (clsRoomTypeData.findRoomType(name, ref id))
            {
                return new clsRoomTypeBuisness(enMode.update, id, name);
            }
            return null;
        }

        private bool _add()
        {
            this.id = clsRoomTypeData.createRoomType(name);
            return (this.id != 0);
        }

        private bool _update()
        {
            return clsRoomTypeData.updateRoomType(name, id);
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

        public static List<clsRoomTypeBuisness> getRoomTypes()
        {
            return clsRoomTypeData.getRoomTypes()
            .AsEnumerable()
            .Select(e => convertInlineToObject(e))
            .ToList();
        }

        public static bool deleteRoomType(int id)
        {
            return clsRoomTypeData.deleteRoomType(id);
        }

        public static bool isRoomTypeExistByName(string name)
        {
            return clsRoomTypeData.isRoomTypeExistByName(name);
        }
        public static bool isRoomTypeExistByID(int id)
        {
            return clsRoomTypeData.isRoomTypeExistByID(id);
        }


    }
}
