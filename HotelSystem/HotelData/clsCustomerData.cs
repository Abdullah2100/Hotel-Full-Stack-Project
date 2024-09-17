using System;
using System.Configuration;
using Microsoft.Data.SqlClient;

using System.Data.SqlClient;
using HotelData.connectionID;
using System.Data;

namespace HotelData
{
    public class clsCustomerData
    {

        public static string connectionUrl = clsConnectionOperation.connectionString["ConnectionStrings:connectionDefult"] ?? "";

        public static bool findCustomer(
          int id,
          ref string userName,
          ref string password,
          ref int personID,
          ref string phone,
          ref bool isBlock,
          ref string image,
          ref string token
            )
        {
            bool isFound = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select top 1 * from Customers where CustomerID = @id";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                isFound = true;
                                if (reader["userName"] != DBNull.Value)
                                    userName = (string)reader["userName"];
                                else
                                    userName = "";

                                if (reader["password"] != DBNull.Value)
                                    password = (string)reader["password"];
                                else
                                    password = "";

                                if (reader["image"] != DBNull.Value)
                                    image = (string)reader["image"];
                                else
                                    image = "";

                                if (reader["token"] != DBNull.Value)
                                    token = (string)reader["token"];
                                else
                                    token = "";


                                personID = (int)reader["personID"];
                                phone = (string)reader["phone"];
                                isBlock = (bool)reader["isBlock"];


                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isFound;
        }




        public static bool findCustomer(
        string userName,
        string password,
        ref int id,
        ref int personID,
        ref string phone,
        ref bool isBlock,
        ref string image,
        ref string token
         )
        {
            bool isFound = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select top 1 * from Customers where userName = @userName and password = @password";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {
                        cmd.Parameters.AddWithValue("@userName", userName);
                        cmd.Parameters.AddWithValue("@password", password);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                isFound = true;

                                id = (int)reader["CustomerID"];
                                personID = (int)reader["personID"];
                                phone = (string)reader["phone"];
                                isBlock = (bool)reader["isBlock"];




                                if (reader["image"] != DBNull.Value)
                                    image = (string)reader["image"];
                                else image = "";

                                if (reader["token"] != DBNull.Value)
                                    token = (string)reader["token"];
                                else token = "";


                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isFound;
        }





        public static bool findCustomer(
            string phone,
            ref int id,
            ref string userName,
            ref string password,
            ref int personID,
            ref bool isBlock,
            ref string image,
            ref string token
      )
        {
            bool isFound = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select  top 1 * from Customers where phone = @phone";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {
                        cmd.Parameters.AddWithValue("@phone", phone);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                id = (int)reader["CustomerID"];

                                if (reader["userName"] != DBNull.Value)
                                    userName = (string)reader["userName"];
                                else
                                    userName = "";

                                if (reader["password"] != DBNull.Value)
                                    password = (string)reader["password"];
                                else
                                    password = "";

                                if (reader["image"] != DBNull.Value)
                                    image = (string)reader["image"];
                                else
                                    image = "";


                                personID = (int)reader["personID"];
                                isBlock = (bool)reader["isBlock"];

                                if (reader["token"] != DBNull.Value)
                                {
                              token = (string)reader["token"];

                                }else token="";

                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isFound;
        }

        public static bool findCustomer(
                   string token,
                  ref string phone,
                  ref int id,
                  ref string userName,
                  ref string password,
                  ref int personID,
                  ref string image,
                  ref bool isBlock
            )
        {
            bool isFound = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select top 1 * from Customers where token = @token";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {
                        cmd.Parameters.AddWithValue("@token", token);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                isFound = true;
                                id = (int)reader["CustomerID"];

                                if (reader["userName"] != DBNull.Value)
                                    userName = (string)reader["userName"];
                                else userName = "";


                                if (reader["phone"] != DBNull.Value)
                                    phone = (string)reader["phone"];
                                else phone = "";

                                if (reader["password"] != DBNull.Value)
                                    password = (string)reader["password"];
                                else password = "";

                                if (reader["image"] != DBNull.Value)
                                    image = (string)reader["image"];
                                else image = "";



                                personID = (int)reader["personID"];
                                isBlock = (bool)reader["isBlock"];


                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isFound;
        }





        public static int createCustomer
            (
            string phone,
            string userName,
            string password,
            int personID,
            string image,
            string token
      )
        {
            int id = 0;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"
                           insert into  Customers 
                           (userName,password,departmentID,personID,address,phone,image , token)
                           values (@userName,@password,@departmentID,@personID,@address,@phone,@image , @token);
                           select SCOPE_IDENTITY()";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@userName", userName);
                        if (password == "")
                            cmd.Parameters.AddWithValue("@password", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@password", password);

                        if (image == "")
                            cmd.Parameters.AddWithValue("@image", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@image", image);

                        cmd.Parameters.AddWithValue("@tokene", token);
                        cmd.Parameters.AddWithValue("@personID", personID);
                        cmd.Parameters.AddWithValue("@phone", phone);

                        object result = cmd.ExecuteScalar();
                        if (result != null && int.TryParse(result.ToString(), out int resultID))
                        {
                            id = resultID;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return id;
        }




        public static bool updateCustomer
            (
            int id,
            string phone,
            string userName,
            string password,
            int personID,
            bool isBlock,
            string image,
            string token
            )
        {
            bool isUpdate = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"
                           update  Customers  set 
                           userName = @userName,
                           password = @password,
                           personID = @personID,
                           phone = @phone,
                           isBlock = @isBlock,
                           image = @image,
                           token = @token
                           where CustomerID = @id";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@userName", userName);


                        if (string.IsNullOrEmpty(password))
                            cmd.Parameters.AddWithValue("@password", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@password", password);

                        if (string.IsNullOrEmpty(image))
                            cmd.Parameters.AddWithValue("@image", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@image", image);

                        if (string.IsNullOrEmpty(token))
                            cmd.Parameters.AddWithValue("@token", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@token", token);



                        cmd.Parameters.AddWithValue("@personID", personID);



                        cmd.Parameters.AddWithValue("@isBlock", isBlock);
                        cmd.Parameters.AddWithValue("@phone", phone);

                        int result = cmd.ExecuteNonQuery();
                        if (result > 0)
                        {
                            isUpdate = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isUpdate;
        }



        public static bool deleteCustomerByID(int personID)
        {
            bool isDeleted = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"SP_deletCustomerByID @personID = @personID";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {

                        //'@CustomerID
                        cmd.Parameters.AddWithValue("@personID", personID);


                        int result = cmd.ExecuteNonQuery();
                        if (result != 0)
                        {
                            isDeleted = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return isDeleted;
        }

        public static bool deleteCustomerByPhone(string phone)
        {
            bool isDeleted = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"SP_deletCustomerByPHone";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@phone", phone);


                        object result = cmd.ExecuteScalar();
                        if (result != null && int.TryParse(result.ToString(), out int resultID))
                        {
                            isDeleted = resultID == 1 ? true : false;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return isDeleted;
        }


        public static DataTable getCustomers()
        {

            DataTable dtCustomer = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select * from Customer_view";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {

                            if (reader.HasRows)
                            {
                                dtCustomer.Load(reader);
                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return dtCustomer;
        }


        public static bool changeCustomerState(int id, bool isBlock)
        {
            bool CustomerState = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"update  Customers set isBlock = @isBlock  where CustomerID = @id";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@isBlock", isBlock);


                        object result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            CustomerState = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return CustomerState;
        }


        public static bool isCustomerBlock(int id)
        {
            bool isBlock = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Customers  where CustomerID = @id and isBlock = 0";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@id", id);


                        object result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            isBlock = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isBlock;
        }


        public static bool isCustomerExistByUserName(string userName)
        {
            bool isExist = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Customers  where userName = @userName ";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@userName", userName);


                        object result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            isExist = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isExist;
        }


        public static bool isCustomerExistByPhone(string phone)
        {
            bool isExist = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Customers  where phone = @phone ";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@phone", phone);


                        object result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            isExist = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isExist;
        }

        public static bool isCustomerExistByToken(string token)
        {
            bool isExist = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Customers  where token = @token ";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@token", token);


                        object result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            isExist = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return isExist;
        }

    }
}
