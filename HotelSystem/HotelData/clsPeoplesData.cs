using System;
using System.Configuration;
using HotelData.connectionID;
using Microsoft.Data.SqlClient;

namespace HotelData
{
    public class clsPeoplesData
    {

        public static  string connectionUrl = clsConnectionOperation.connectionString["ConnectionStrings:connectionDefult"]??"";

        public static bool findPerson
            (
            int id,
            ref string firstName,
            ref string lastName,
            ref DateTime brithDay,
            ref DateTime createdDate,
            ref string nationalNo
            )
        {
            bool isFound = false;

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionUrl))
                {
                    conn.Open();
                    string query = @"select * from Peoples where personID = @personID";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        cmd.Parameters.AddWithValue("@personID", id);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                isFound = true;
                                firstName = (string)reader["firstName"];
                                lastName = (string)reader["lastName"];
                                nationalNo = (string)reader["nationalNo"];
                                brithDay = (DateTime)reader["brithDay"];
                                createdDate = (DateTime)reader["createdDate"];

                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error is :" + ex.ToString());

            }


            return isFound;
        }


        public static bool findPerson
            (
            string nationalNo,
            ref int id,
            ref string firstName,
            ref string lastName,
            ref DateTime brithDay,
            ref DateTime createdDate
            )
        {
            bool isFound = false;

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionUrl))
                {
                    conn.Open();
                    string query = @"select * from Peoples where nationalNo = @nationalNo";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        cmd.Parameters.AddWithValue("@nationalNo", nationalNo);
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                isFound = true;
                                id = (int)reader["personID"];
                                firstName = (string)reader["firstName"];
                                lastName = (string)reader["lastName"];
                                nationalNo = (string)reader["nationalNo"];
                                brithDay = (DateTime)reader["brithDay"];
                                createdDate = (DateTime)reader["createdDate"];

                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error is :" + ex.ToString());

            }


            return isFound;
        }


        public static int createPerson
        (
         string firstName,
         string lastName,
        DateTime brithDay,
        DateTime createdDate,
        string nationalNo
            )
        {
            int personID = 0;
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionUrl))
                {
                    conn.Open();
                    string query = @"
                                    insert into Peoples(firstName,lastName,brithDay ,createdDate,nationalNo)
                                    values(@firstName,@lastName,@brithDay ,@createdDate,@nationalNo);
                                    select SCOPE_IDENTITY();
                                    ";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        cmd.Parameters.AddWithValue("@firstName", firstName);
                        cmd.Parameters.AddWithValue("@lastName", lastName);
                        cmd.Parameters.AddWithValue("@brithDay", brithDay);
                        cmd.Parameters.AddWithValue("@createdDate", createdDate);
                        cmd.Parameters.AddWithValue("@nationalNo", nationalNo);


                        object result = cmd.ExecuteScalar();
                        if (result != null && int.TryParse(result.ToString(), out int resultID))
                        {
                            personID = resultID;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error is :" + ex.ToString());

            }


            return personID;
        }


        public static bool updatePerson
            (
            int personID,
            string firstName,
            string lastName,
            DateTime brithDay,
            string nationalNo
            )
        {
            bool isUpdate = false;
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionUrl))
                {
                    conn.Open();
                    string query = @"
                                    update Peoples set 
                                    firstName = @firstName,
                                    lastName = @lastName,
                                    brithDay = @brithDay,
                                    nationalNo = @nationalNo
                                    where personID = @personID
                                    ";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        cmd.Parameters.AddWithValue("@personID", personID);
                        cmd.Parameters.AddWithValue("@firstName", firstName);
                        cmd.Parameters.AddWithValue("@lastName", lastName);
                        cmd.Parameters.AddWithValue("@brithDay", brithDay);
                        cmd.Parameters.AddWithValue("@nationalNo", nationalNo);


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
                Console.WriteLine("Error is :" + ex.ToString());

            }


            return isUpdate;
        }








        public static bool deletePersonByID(int personID)
        {
            bool isDeleted = false;
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionUrl))
                {
                    conn.Open();
                    string query = @"delete Peoples where personID = @personID
                                    ";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        cmd.Parameters.AddWithValue("@personID", personID);


                        int result = cmd.ExecuteNonQuery();
                        if (result > 0)
                        {
                            isDeleted = true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error is :" + ex.ToString());

            }

            return isDeleted;
        }



        public static bool isPersonExistByNationalNo(string nationalNo)
        {
            bool isBlock = false;
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionUrl))
                {
                    conn.Open();
                    string query = @"select found = 1 from Peoples where  nationalNo = @nationalNo";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        cmd.Parameters.AddWithValue("@nationalNo", nationalNo);


                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                isBlock = (bool)reader.Read();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error is :" + ex.ToString());

            }

            return isBlock;
        }


    }
}
