using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelData.Dto
{
    public class clsEmployeeDto
    {
        public int id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public int departmentID { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public bool isBlock { get; set; }
        public string image { get; set; }
        public string token { get; set; }
    }
}