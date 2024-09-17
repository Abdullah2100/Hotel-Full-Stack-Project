using System.Data;
using HotelData;

namespace HotelBuisness
{
    public class clsCustomerBuisness
    {
        enum enMode { add, update };
        private enMode _mode { get; set; }
        public int id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public int personID { get; set; }
        public string phone { get; set; }
        public string image { get; set; }
        public string token { get; set; }
        public bool isBlock { get; set; }
        public clsPersonBuisness personInfo { get; set; }

        public string fullName
        {
            get { return personInfo.firstName + " " + personInfo.lastName; }
        }

        public clsCustomerBuisness()
        {
            _mode = enMode.add;
            id = 0;
            userName = "";
            password = "";
            personID = 0;
            phone = "";
            image = "";
            token = "";
            isBlock = false;
        }

        private clsCustomerBuisness(
            enMode mode,
         int id,
         string userName,
         string password,
          int personID,
          string phone,
           string image,
           string token,
           bool isBlock)
        {
            _mode = mode;
            this.id = id;
            this.userName = userName;
            this.password = password;
            this.personID = personID;
            this.phone = phone;
            this.image = image;
            this.token = token;
            this.isBlock = isBlock;
            this.personInfo = personInfo;
            personInfo = clsPersonBuisness.findPersonByID(personID);
        }



        public static clsCustomerBuisness? findCustomerByID(int id)
        {

            string userName = "";
            string password = "";
            int personID = 0;
            string phone = "";
            string image = "";
            string token = "";
            bool isBlock = false;
            if (clsCustomerData.findCustomer(id, ref userName, ref password, ref personID, ref phone, ref isBlock, ref image, ref token))
            {
                return new clsCustomerBuisness(
                    enMode.update,
                    id, userName,
                    password,
                    personID,
                    phone,
                    image,
                    token,
                    isBlock
                    );
            }
            return null;
        }


        public static clsCustomerBuisness? findCustomerByPhone(string phone)
        {

            int id = 0;
            string userName = "";
            string password = "";
            int personID = 0;
            string image = "";
            string token = "";
            bool isBlock = false;
            if (clsCustomerData.findCustomer(phone, ref id, ref userName, ref password, ref personID, ref isBlock, ref image, ref token))
            {
                return new clsCustomerBuisness(
                    enMode.update,
                    id, userName,
                    password,
                    personID,
                    phone,
                    image,
                    token,
                    isBlock
                    );
            }
            return null;
        }


        public static clsCustomerBuisness? findCustomerByToken(string token)
        {

            int id = 0;
            string userName = "";
            string password = "";
            int personID = 0;
            string image = "";
            string phone = "";
            bool isBlock = false;
            try
            {

                if (clsCustomerData.findCustomer(
                    token,
                    ref phone,
                    ref id,
                    ref userName,
                     ref password,
                     ref personID,
                      ref image,
                      ref isBlock
                      ))
                {
                    return new clsCustomerBuisness(
                        enMode.update,
                        id, userName,
                        password,
                        personID,
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






        public static clsCustomerBuisness? findCustomerByUserNameAndPassword(string userName, string password)
        {

            int id = 0;
            string phone = "";
            int personID = 0;
            string image = "";
            string token = "";
            bool isBlock = false;
            if (clsCustomerData.findCustomer(userName, password, ref id, ref personID, ref phone, ref isBlock, ref image, ref token))
            {
                return new clsCustomerBuisness(
                    enMode.update,
                    id, userName,
                    password,
                    personID,
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
            this.id = clsCustomerData.createCustomer(phone, userName, password, personID, image, token);
            return (this.id != 0);
        }

        private bool _update()
        {
            return clsCustomerData.updateCustomer(id, phone, userName, password, personID, isBlock, image, token);
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



        public static DataTable getCustomers()
        {
            return clsCustomerData.getCustomers();
        }

        public static bool deleteCustomer(int personID)
        {
            return clsCustomerData.deleteCustomerByID(personID);
        }

        public static bool isCustomerBlock(int id)
        {
            return clsCustomerData.isCustomerBlock(id);
        }

        public static bool isCustomerExistByUserName(string userName)
        {
            return clsCustomerData.isCustomerExistByUserName(userName);
        }

        public static bool isCustomerExistByPhone(string phone)
        {
            return clsCustomerData.isCustomerExistByPhone(phone);
        }

        public static bool isCustomerExistByToken(string token)
        {
            return clsCustomerData.isCustomerExistByToken(token);
        }
        public static bool activateCustomer(int id)
        {
            return clsCustomerData.changeCustomerState(id, true);
        }

        public static bool deActivateCustomer(int id)
        {
            return clsCustomerData.changeCustomerState(id, false);
        }



    }
}
