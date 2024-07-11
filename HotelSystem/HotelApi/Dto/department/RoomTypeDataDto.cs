using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Dto.Employee
{
    public class RoomTypeDataDto
    {

        public int id { get; set; }
        public string name { get; set; }

        public RoomTypeDataDto()
        {
            id = 0;
            name = "";
        }

    }
}