using System;
using System.Configuration;
using Microsoft.Data.SqlClient;

using System.Data.SqlClient;
using HotelData.connectionID;
using System.Data;

namespace HotelData
{
    public class clsEmployeeData
    {

        public static string connectionUrl = clsConnectionOperation.connectionString["ConnectionStrings:connectionDefult"] ?? "";

        public static bool findEmployee(
          int id,
          ref string userName,
          ref string password,
          ref int departmentID,
          ref int personID,
          ref string address,
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
                    string qery = @"select * from Employees where employeeID = @id";

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

                                departmentID = (int)reader["departmentID"];

                                personID = (int)reader["personID"];
                                address = (string)reader["address"];
                                phone = (string)reader["phone"];
                                isBlock = (bool)reader["isBlock"];


                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isFound;
        }




        public static bool findEmployee(
        string userName,
        string password,
        ref int id,
        ref int departmentID,
        ref int personID,
        ref string address,
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
                    string qery = @"select * from Employees where userName = @userName and password = @password";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {
                        cmd.Parameters.AddWithValue("@userName", userName);
                        cmd.Parameters.AddWithValue("@password", password);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {

                                id = (int)reader["employeeID"];

                                departmentID = (int)reader["departmentID"];

                                personID = (int)reader["personID"];
                                address = (string)reader["address"];
                                phone = (string)reader["phone"];
                                isBlock = (bool)reader["isBlock"];
                                if (reader["image"] != DBNull.Value)
                                    image = (string)reader["image"];
                                else
                                    image = "";

                                if (reader["token"] != DBNull.Value)
                                    token = (string)reader["token"];
                                else
                                    token = "";


                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isFound;
        }





        public static bool findEmployee(
            string phone,
            ref int id,
            ref string userName,
            ref string password,
            ref int departmentID,
            ref int personID,
            ref string address,
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
                    string qery = @"select * from Employees where phone = @phone";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {
                        cmd.Parameters.AddWithValue("@phone", phone);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                id = (int)reader["employeeID"];

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

                                departmentID = (int)reader["departmentID"];

                                personID = (int)reader["personID"];
                                address = (string)reader["address"];
                                isBlock = (bool)reader["isBlock"];


                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isFound;
        }

        public static int createEmployee
            (
            string phone,
            string userName,
            string password,
            int departmentID,
            int personID,
            string address,
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
                           insert into  Employees 
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
                        cmd.Parameters.AddWithValue("@departmentID", departmentID);
                        cmd.Parameters.AddWithValue("@personID", personID);
                        cmd.Parameters.AddWithValue("@address", address);
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

                Console.WriteLine("Error is :" + ex.Message);
            }


            return id;
        }




        public static bool updateEmployee
            (
            int id,
            string phone,
            string userName,
            string password,
            int departmentID,
            int personID,
            string address,
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
                           update  Employees  set 
                           userName = @userName,
                           password = @password,
                           departmentID =  @departmentID,
                           personID = @personID,
                           address = @address,
                           phone = @phone,
                           isBlock = @isBlock,
                           image = @image
                           token = @token
                           where employeeID = @id";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@userName", userName);


                        if (password == "")
                            cmd.Parameters.AddWithValue("@password", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@password", password);

                        if (image == "")
                            cmd.Parameters.AddWithValue("@image", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@image", image);

                        if (token == "")
                            cmd.Parameters.AddWithValue("@token", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@token", token);

                        cmd.Parameters.AddWithValue("@departmentID", departmentID);
                        cmd.Parameters.AddWithValue("@personID", personID);
                        cmd.Parameters.AddWithValue("@address", address);
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

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isUpdate;
        }



        public static bool deleteEmployeeByID(int personID)
        {
            bool isDeleted = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"SP_deletEmployeeByID @personID = @personID";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {

                        //'@employeeID
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

                Console.WriteLine("Error is :" + ex.Message);
            }

            return isDeleted;
        }

        public static bool deleteEmployeeByPhone(string phone)
        {
            bool isDeleted = false;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"SP_deletEmployeeByPHone";

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

                Console.WriteLine("Error is :" + ex.Message);
            }

            return isDeleted;
        }


        public static DataTable getEmployees()
        {

            DataTable dtEmployee = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select * from Employee_view";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {

                            if (reader.HasRows)
                            {
                                dtEmployee.Load(reader);
                            }
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                Console.WriteLine("Error is :" + ex.Message);
            }

            return dtEmployee;
        }


        public static bool changeEmployeeState(int id, bool isBlock)
        {
            bool employeeState = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"update  Employees set isBlock = @isBlock  where employeeID = @id";

                    using (SqlCommand cmd = new SqlCommand(qery, con))
                    {


                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@isBlock", isBlock);


                        object result = cmd.ExecuteScalar();
                        if (result != null)
                        {
                            employeeState = true;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                Console.WriteLine("Error is :" + ex.Message);
            }


            return employeeState;
        }


        public static bool isEmployeeBlock(int id)
        {
            bool isBlock = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Employees  where employeeID = @id and isBlock = 0";

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

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isBlock;
        }


        public static bool isEmployeeExistByUserName(string userName)
        {
            bool isExist = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Employees  where userName = @userName ";

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

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isExist;
        }


        public static bool isEmployeeExistByPhone(string phone)
        {
            bool isExist = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Employees  where phone = @phone ";

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

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isExist;
        }

        public static bool isEmployeeExistByToken(string token)
        {
            bool isExist = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string qery = @"select found = 1 from Employees  where token = @token ";

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

                Console.WriteLine("Error is :" + ex.Message);
            }


            return isExist;
        }

    }
}
