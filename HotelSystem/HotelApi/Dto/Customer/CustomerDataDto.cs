using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Global;
using HotelBuisness;
using HotelData;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using HotelApi.Dto.PersonDto;
namespace HotelApi.Dto.Customer
{
    public class CustomerDataDto
    {
        public int id { get; set; }
        public string userName { get; set; }
        public int personID { get; set; }
        public string phone { get; set; }
        public string image { get; set; }
        public bool isBlock { get; set; }
        public PersonDataDto personalData { get; set; }
        public CustomerDataDto()
        {
            id = 0;
            userName = "";
            phone = "";
            image = "";
            personalData = new PersonDataDto();
            isBlock = false;
        }


        public static CustomerDataDto convertBuisnessCustomerToDto(clsCustomerBuisness customer)
        {

            CustomerDataDto customerData = new CustomerDataDto();

            customerData.id = customer.id;
            customerData.userName = customer.userName;
            customerData.phone = customer.phone;
            if (!string.IsNullOrEmpty(customer.image))
                customerData.image = "Images/" + clsFileHelper.enFileType.adminProfile + "/" + customer.image;
            PersonDataDto personData = new PersonDataDto();
            personData.firstName = customer.personInfo.firstName;
            personData.lastName = customer.personInfo.lastName;
            personData.brithDay = customer.personInfo.brithDay;
            personData.nationalNo = customer.personInfo.nationalNo;

            customerData.personalData = personData;
            customerData.isBlock = customer.isBlock;

            return customerData;
        }


    }
}