using System.Data;
using HotelData;

namespace HotelBuisness
{
    public class clsEmployeeBuisness
    {
        enum enMode { add, update };
        private enMode _mode { get; set; }
        public int id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public int departmentID { get; set; }
        public int personID { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string image { get; set; }
        public string token { get; set; }
        public bool isBlock { get; set; }
        public clsPersonBuisness personInfo { get; set; }
        public clsDepartmentBuisness departmentInfo { get; set; }

        public string fullName
        {
            get { return personInfo.firstName + " " + personInfo.lastName; }
        }

        public clsEmployeeBuisness()
        {
            _mode = enMode.add;
            id = 0;
            userName = "";
            password = "";
            departmentID = 0;
            personID = 0;
            address = "";
            phone = "";
            image = "";
            token = "";
            isBlock = false;
        }

        private clsEmployeeBuisness(enMode mode, int id, string userName, string password, int departmentID, int personID, string address, string phone, string image, string token, bool isBlock)
        {
            _mode = mode;
            this.id = id;
            this.userName = userName;
            this.password = password;
            this.departmentID = departmentID;
            this.personID = personID;
            this.address = address;
            this.phone = phone;
            this.image = image;
            this.token = token;
            this.isBlock = isBlock;
            this.personInfo = personInfo;
            this.departmentInfo = departmentInfo;
            departmentInfo = clsDepartmentBuisness.findDepartmentByID(departmentID);
            personInfo = clsPersonBuisness.findPersonByID(personID);
        }



        public static clsEmployeeBuisness? findEmployeeByID(int id)
        {

            string userName = "";
            string password = "";
            int departmentID = 0;
            int personID = 0;
            string address = "";
            string phone = "";
            string image = "";
            string token = "";
            bool isBlock = false;
            if (clsEmployeeData.findEmployee(id, ref userName, ref password, ref departmentID, ref personID, ref address, ref phone, ref isBlock, ref image, ref token))
            {
                return new clsEmployeeBuisness(
                    enMode.update,
                    id, userName,
                    password,
                    departmentID,
                    personID,
                    address,
                    phone,
                    image,
                    token,
                    isBlock
                    );
            }
            return null;
        }


        public static clsEmployeeBuisness findEmployeeByPhone(string phone)
        {

            int id = 0;
            string userName = "";
            string password = "";
            int departmentID = 0;
            int personID = 0;
            string address = "";
            string image = "";
            string token = "";
            bool isBlock = false;
            if (clsEmployeeData.findEmployee(phone, ref id, ref userName, ref password, ref departmentID, ref personID, ref address, ref isBlock, ref image, ref token))
            {
                return new clsEmployeeBuisness(
                    enMode.update,
                    id, userName,
                    password,
                    departmentID,
                    personID,
                    address,
                    phone,
                    image,
                    token,
                    isBlock
                    );
            }
            return null;
        }

        public static clsEmployeeBuisness? findEmployeeByUserNameAndPassword(string userName, string password)
        {

            int id = 0;
            string phone = "";
            int departmentID = 0;
            int personID = 0;
            string address = "";
            string image = "";
            string token = "";
            bool isBlock = false;
            if (clsEmployeeData.findEmployee(userName, password, ref id, ref departmentID, ref personID, ref address, ref phone, ref isBlock, ref image, ref token))
            {
                return new clsEmployeeBuisness(
                    enMode.update,
                    id, userName,
                    password,
                    departmentID,
                    personID,
                    address,
                    phone,
                    image,
                    token,
                    isBlock
                    );
            }
            return null;
        }


        private bool _add()
        {
            this.id = clsEmployeeData.createEmployee(phone, userName, password, departmentID, personID, address, image, token);
            return (this.id != 0);
        }

        private bool _update()
        {
            return clsEmployeeData.updateEmployee(id, phone, userName, password, departmentID, personID, address, isBlock, image, token);
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
                        {
                            return true;
                        }
                        return false;
                    }

            }
            return false;
        }



        public static DataTable getEmployees()
        {
            return clsEmployeeData.getEmployees();
        }

        public static bool deleteEmployee(int personID)
        {
            return clsEmployeeData.deleteEmployeeByID(personID);
        }

        public static bool isEmployeeBlock(int id)
        {
            return clsEmployeeData.isEmployeeBlock(id);
        }

        public static bool isEmployeeExistByUserName(string userName)
        {
            return clsEmployeeData.isEmployeeExistByUserName(userName);
        }

        public static bool isEmployeeExistByPhone(string phone)
        {
            return clsEmployeeData.isEmployeeExistByPhone(phone);
        }

        public static bool isEmployeeExistByToken(string token)
        {
            return clsEmployeeData.isEmployeeExistByToken(token);
        }
        public static bool activateEmployee(int id)
        {
            return clsEmployeeData.changeEmployeeState(id, true);
        }

        public static bool deActivateEmployee(int id)
        {
            return clsEmployeeData.changeEmployeeState(id, false);
        }



    }
}
