using HotelData;
using System;

namespace HotelBuisness
{
    public class clsPersonBuisness
    {

        enum enMode { add, update };
        private enMode _mode { get; set; }
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nationalNo { get; set; }
        public DateTime brithDay { get; set; }
        public DateTime createdDate { get; set; }

        public string fullName
        {
            get { return firstName + " " + lastName; }
        }
        public clsPersonBuisness()
        {
            _mode = enMode.add;
            id = 0;
            firstName = "";
            lastName = "";
            nationalNo = "";
            brithDay = DateTime.Now;
            createdDate = DateTime.Now;
            _mode = enMode.add;
        }

        private clsPersonBuisness(enMode mode, int id, string firstName, string lastName, DateTime brithDay, DateTime createdDate, string nationalNo)
        {
            _mode = mode;
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.brithDay = brithDay;
            this.createdDate = createdDate;
            this.nationalNo = nationalNo;
            this._mode = mode;
        }


        public static clsPersonBuisness? findPersonByID(int id)
        {
            string firstName = "";
            string lastName = "";
            string nationalNo = "";
            DateTime brithDay = DateTime.Now;
            DateTime createdDate = DateTime.Now;
            try
            {


                if (clsPeoplesData.findPerson(id, ref firstName, ref lastName, ref brithDay, ref createdDate, ref nationalNo))
                {
                    return new clsPersonBuisness(enMode.update, id, firstName, lastName, brithDay, createdDate, nationalNo);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("some thing Rowng");
            }

        }

        public static clsPersonBuisness? findPersonByNationalNo(string nationalNo)
        {
            string firstName = "";
            string lastName = "";
            int id = 0;
            DateTime brithDay = DateTime.Now;
            DateTime createdDate = DateTime.Now;
            try
            {

                if (clsPeoplesData.findPerson(nationalNo, ref id, ref firstName, ref lastName, ref brithDay, ref createdDate))
                {
                    return new clsPersonBuisness(enMode.update, id, firstName, lastName, brithDay, createdDate, nationalNo);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");
            }
        }

        private bool _add()
        {
            try
            {

                this.id = clsPeoplesData.createPerson(firstName, lastName, brithDay, createdDate, nationalNo);
                return (id != 0);
            }
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");
            }
        }

        private bool _update()
        {
            try
            {

                return clsPeoplesData.updatePerson(id, firstName, lastName, brithDay, nationalNo);
            }
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");
            }
        }

        public bool save()
        {
            try
            {

                switch (_mode)
                {
                    case enMode.add:
                        {
                            if (_add())
                            {
                                //       _mode = enMode.update;
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
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");

            }
        }


        public static bool deletePersonByID(int id)
        {
            try
            {

                return clsPeoplesData.deletePersonByID(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");

            }
        }


        public static bool isPersonExistByNationalNo(string nationalNo)
        {
            try
            {

                return clsPeoplesData.isPersonExistByNationalNo(nationalNo);
            }
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");

            }


        }

        public static bool isPersonExistByID(int id)
        {
            try
            {

                return clsPeoplesData.isPersonExistByID(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Some Thing Wrong");

            }


        }

    }
}
