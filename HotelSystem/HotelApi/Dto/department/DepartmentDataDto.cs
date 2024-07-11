using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Dto.Employee
{
    public class DepartmentDataDto
    {

        public int id { get; set; }
        public string name { get; set; }

        public DepartmentDataDto()
        {
            id = 0;
            name = "";
        }

    }
}