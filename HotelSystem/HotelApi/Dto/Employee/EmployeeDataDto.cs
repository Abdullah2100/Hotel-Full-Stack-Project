using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Dto.PersonDto;
using HotelApi.Global;
using HotelBuisness;
using HotelData;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace HotelApi.Dto.Employee
{
    public class EmployeeDataDto : PersonDataDto
    {
        public int id { get; set; }
        public string userName { get; set; }
        public int personID { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string image { get; set; }
        public bool isBlock { get; set; }
        public DepartmentDataDto? departmentData { get; set; }
        public PersonDataDto personalData { get; set; }
        public EmployeeDataDto()
        {
            id = 0;
            userName = "";
            address = "";
            phone = "";
            image = "";
            departmentData = null;
            personalData = new PersonDataDto();
            isBlock = false;
        }

        public override bool isPerson()
        {
            return base.isPerson();
        }
    }
}