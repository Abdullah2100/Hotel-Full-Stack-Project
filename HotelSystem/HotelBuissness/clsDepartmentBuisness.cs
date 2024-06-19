using System.Data;
using HotelData;

namespace HotelBuisness
{
    public class clsDepartmentBuisness
    {
        enum enMode { add, update };
        private enMode _mode { get; set; }
        public int id { get; set; }
        public string name { get; set; }

        public clsDepartmentBuisness()
        {
            _mode = enMode.add;
            id = 0;
            name = "";
        }

        private clsDepartmentBuisness(enMode mode, int id, string name)
        {
            _mode = mode;
            this.id = id;
            this.name = name;
        }

        public static clsDepartmentBuisness findDepartmentByID(int id)
        {
            string name = "";
            if (clsDepartmentData.findDepartment(id, ref name))
            {
                return new clsDepartmentBuisness(enMode.update, id, name);
            }
            return null;
        }

        public static clsDepartmentBuisness findDepartmentByName(string name)
        {
            int id = 0;
            if (clsDepartmentData.findDepartment(name, ref id))
            {
                return new clsDepartmentBuisness(enMode.update, id, name);
            }
            return null;
        }

        private bool _add()
        {
            this.id = clsDepartmentData.createDepartment(name);
            return (this.id != 0);
        }

        private bool _update()
        {
            return clsDepartmentData.updateDepartment(name, id);
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

        public static DataTable getDepartments()
        {
            return clsDepartmentData.getDepartments();
        }

        public static bool deleteDepartment(int id)
        {
            return clsDepartmentData.deleteDepartment(id);
        }

        public static bool isDepartmentExistByName(string name)
        {
            return clsDepartmentData.isDepartmentExistByName(name);
        }
    }
}
