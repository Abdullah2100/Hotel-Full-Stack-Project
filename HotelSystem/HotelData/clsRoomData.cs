using System;
using System.Configuration;
using System.Data;
using HotelData.connectionID;
using Microsoft.Data.SqlClient;

namespace HotelData
{
    public class clsRoomData
    {

        public static string connectionUrl = clsConnectionOperation.connectionString["ConnectionStrings:connectionDefult"] ?? "";

        public static bool findRoomByID
            (
            int id,
            ref Int16 capacity,
            ref Int16 bedNumber,
            ref double pricePerDay,
            ref Int16 state,
            ref int? addBy,
            ref short floorNumber,
            ref DateTime createdDate,
            ref int roomTypeID,
            ref string title,
            ref string description,
            ref bool isRent
            )
        {
            bool isFound = false;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string query = @"select * from Rooms where roomID = @id ";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                isFound = true;

                                capacity = (Int16)reader["capacity"];
                                bedNumber = (Int16)reader["bedNumber"];
                                pricePerDay = (double)reader["pricePerDay"];
                                // state = (Int16)reader["state"];
                                floorNumber = (short)reader["floorNumber"];
                                createdDate = (DateTime)reader["createdDate"];
                                roomTypeID = (int)reader["roomTypeID"];
                                title = (string)reader["title"];
                                description = (string)reader["description"];
                                isRent = (bool)reader["isRent"];

                                if (reader["addBy"] == DBNull.Value)
                                    addBy = null;
                                else
                                    addBy = (int)reader["addBy"];
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error is : " + ex.ToString());
            }


            return isFound;
        }

        public static int createRoom
                (
                Int16 capacity,
            Int16 bedNumber,
                double pricePerDay,
                 //  Int16 state,
                 int? addBy,

                 short floorNumber,

                 int roomTypeID,
                  string title,
                   string description
                )
        {
            int ID = 0;
            try
            {

                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string query = @" 
                                   INSERT INTO Rooms
                                   (
                                   capacity,
                                   bedNumber,
                                   pricePerDay ,
                                   addBy,
                                   roomTypeID,
                                   floorNumber,
                                   title,
                                   description
                                   )
                                   VALUES
                                   (
                                   @capacity,
                                   @bedNumber,
                                   @pricePerDay,
                                   @addBy,
                                   @roomTypeID,
                                   @floorNumber,
                                   @title,
                                   @description
                                   );
                                     select SCOPE_IDENTITY();";
                    // @state,
                    // state,   
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@capacity", capacity);
                        cmd.Parameters.AddWithValue("@bedNumber", bedNumber);
                        cmd.Parameters.AddWithValue("@pricePerDay", pricePerDay);
                        // cmd.Parameters.AddWithValue("@state", state);
                        cmd.Parameters.AddWithValue("@floorNumber", floorNumber);
                        cmd.Parameters.AddWithValue("@roomTypeID", roomTypeID);
                        cmd.Parameters.AddWithValue("@title", title);
                        cmd.Parameters.AddWithValue("@description", description);
                        if (addBy == null)
                            cmd.Parameters.AddWithValue("@addBy", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@addBy", addBy);

                        object result = cmd.ExecuteScalar();

                        if (result != null && int.TryParse(result.ToString(), out int resultID))
                        {
                            ID = resultID;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error is : " + ex.ToString());
            }


            return ID;
        }


        public static bool UpdateRoom
            (
            int id,
            Int16 capacity,
            Int16 bedNumber,
            double pricePerDay,
            // Int16 state,
            int? addBy,
            short floorNumber,
            int roomTypeID,
            string title,
            string description
            )
        {
            bool isUpdate = false;
            try
            {

                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string query = @" 
                            update Rooms  set
                                capacity = case  when @capacity > 0 then @capacity else capacity  end,
                                bedNumber = case   when @bedNumber > 0 then  @bedNumber else bedNumber  end,
                                pricePerDay = case   when @pricePerDay > 0 then  @pricePerDay else pricePerDay end,
                                    addBy = @addBy,
                                floorNumber = case when @floorNumber > 0 then  @floorNumber else floorNumber end,
                                roomTypeID = case  when @roomTypeID > 0 then @roomTypeID else roomTypeID  end,
                                title = case when len(@title) > 0 then  @title else title  end,
                                description = case  when len(@description) > 0 then  @description else description  end
                            where  roomID = @id
                                 ";
                    // state = @state ,
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);

                        if (capacity > 0)
                            cmd.Parameters.AddWithValue("@capacity", capacity);
                        else cmd.Parameters.AddWithValue("@capacity", DBNull.Value);

                        if (bedNumber > 0)
                            cmd.Parameters.AddWithValue("@bedNumber", bedNumber);
                        else cmd.Parameters.AddWithValue("@bedNumber", DBNull.Value);

                        if (pricePerDay > 0)
                            cmd.Parameters.AddWithValue("@pricePerDay", pricePerDay);
                        else cmd.Parameters.AddWithValue("@pricePerDay", DBNull.Value);

                        // cmd.Parameters.AddWithValue("@state", state);
                        if (floorNumber > 0)
                            cmd.Parameters.AddWithValue("@floorNumber", floorNumber);
                        else cmd.Parameters.AddWithValue("@floorNumber", DBNull.Value);

                        if (roomTypeID == 0)
                            cmd.Parameters.AddWithValue("@roomTypeID", roomTypeID);
                        else cmd.Parameters.AddWithValue("@roomTypeID", DBNull.Value);

                        if (!string.IsNullOrEmpty(title))
                            cmd.Parameters.AddWithValue("@title", title);
                        else cmd.Parameters.AddWithValue("@title", DBNull.Value);

                        if (!string.IsNullOrEmpty(description))
                            cmd.Parameters.AddWithValue("@description", description);
                        else cmd.Parameters.AddWithValue("@description", DBNull.Value);

                        if (addBy == null)
                            cmd.Parameters.AddWithValue("@addBy", DBNull.Value);
                        else
                            cmd.Parameters.AddWithValue("@addBy", addBy);

                        int result = cmd.ExecuteNonQuery();

                        if (result > 0)
                            isUpdate = true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error is : " + ex.ToString());
            }

            return isUpdate;
        }

        public static bool deleteRoom
            (
            int id
            )
        {
            bool isUpdate = false;
            try
            {

                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string query = @"delete Rooms  where roomID = @id  ";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@id", id);

                        int result = cmd.ExecuteNonQuery();

                        if (result > 0)
                            isUpdate = true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error is : " + ex.ToString());
            }

            return isUpdate;
        }

        public static DataTable getRooms()
        {
            DataTable dtRooms = new DataTable();
            try
            {

                using (SqlConnection con = new SqlConnection(connectionUrl))
                {
                    con.Open();
                    string query = @"select * from Rooms";
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                dtRooms.Load(reader);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error is : " + ex.ToString());
            }

            return dtRooms;
        }
    }
}
