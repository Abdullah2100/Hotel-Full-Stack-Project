using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


        public static EmployeeDataDto convertBuisnessEmployeeToDto(clsEmployeeBuisness employee)
        {

            EmployeeDataDto employeeData = new EmployeeDataDto();

            employeeData.id = employee.id;
            employeeData.userName = employee.userName;
            employeeData.address = employee.address;
            employeeData.phone = employee.phone;
            if (!string.IsNullOrEmpty(employee.image))
                employeeData.image = "Images/" + clsFileHelper.enFileType.adminProfile + "/" + employee.image;
            DepartmentDataDto departmentData = new DepartmentDataDto();
            if (employee.departmentInfo != null)
            {

                departmentData.id = employee.departmentID;
                departmentData.name = employee.departmentInfo.name;
            }
            PersonDataDto personData = new PersonDataDto();
            personData.firstName = employee.personInfo.firstName;
            personData.lastName = employee.personInfo.lastName;
            personData.brithDay = employee.personInfo.brithDay;
            personData.nationalNo = employee.personInfo.nationalNo;
            employeeData.personalData = personData;
            employeeData.departmentData = departmentData;
            employeeData.isBlock = employee.isBlock;

            return employeeData;
        }

        public override bool isPerson()
        {
            return base.isPerson();
        }
    }
}