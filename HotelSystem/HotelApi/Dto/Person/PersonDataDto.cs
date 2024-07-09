using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Dto.Employee
{
    public class PersonDataDto
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string nationalNo { get; set; }
        public DateTime? brithDay { get; set; }
        public DateTime createdDate { get; set; }


        public PersonDataDto()
        {
            firstName = "";
            lastName = "";
            nationalNo = "";
            brithDay = DateTime.Now;
            createdDate = DateTime.Now;
        }

        public virtual bool isPerson()
        {
            return false;
        }
    }
}