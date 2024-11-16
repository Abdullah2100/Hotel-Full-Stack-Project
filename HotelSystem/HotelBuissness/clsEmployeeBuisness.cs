using System.Data;
using HotelData;
using HotelData.Dto;

namespace HotelBuisness
{
    public class clsEmployeeBuisness
    {
        enum enMode { add, update };
        private enMode _mode { get; set; }



        public static clsEmployeeDto? findEmployeeByID(int id)
        {

            return clsEmployeeData.findEmployee(id);


        }


        /*        public static clsEmployeeBuisness? findEmployeeByPhone(string phone)
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


                public static clsEmployeeBuisness? findEmployeeByToken(string token)
                {

                    int id = 0;
                    string userName = "";
                    string password = "";
                    int departmentID = 0;
                    int personID = 0;
                    string address = "";
                    string image = "";
                    string phone = "";
                    bool isBlock = false;
                    try
                    {

                        if (clsEmployeeData.findEmployee(token, ref phone, ref id, ref userName, ref password, ref departmentID, ref personID, ref address, ref isBlock, ref image))
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
                    catch (Exception ex)
                    {
                        throw ex;
                    }
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
        */


    }
}
