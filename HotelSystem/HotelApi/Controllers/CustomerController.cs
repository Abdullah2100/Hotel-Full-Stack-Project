using System.Text.Json;
using HotelApi.Dto;
using HotelApi.Dto.Customer;
using HotelApi.Dto.CustomerRegister;
using HotelApi.Global;
using HotelApi.Injuction;
using HotelBuisness;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace HotelApi.customer.Controllers
{
    //[Route("api/[controller]")]
   [Route("api/Customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private IConfig _config;
        public CustomerController(IConfig config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("/customer/login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult login([FromBody] LoginRequestDto loginRequest)
        {
            try
            {

                clsCustomerBuisness? customerHolder = clsCustomerBuisness.findCustomerByUserNameAndPassword(loginRequest.userName, Util.hashPassword(loginRequest.password));

                if (customerHolder == null)
                    return StatusCode(401);


                string token = Util.generateJWt(_config, customerHolder.personID);

                customerHolder.token = token;

                switch (customerHolder.save())
                {
                    case true:
                        {

                            return Ok(JsonSerializer.Serialize(new { tokenData = token }));
                        }
                    default:
                        {
                            return StatusCode(500);
                        }
                }
            }
            catch (Exception eror)
            {
                return StatusCode(500, "some thing wrong");
            }
        }


        [Authorize]
        [HttpPut("/customer")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult updatecustomer([FromForm] RegisterRequestDto registerRequest)
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];

                if (!clsCustomerBuisness.isCustomerExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);


                clsCustomerBuisness? customer = clsCustomerBuisness.findCustomerByUserNameAndPassword(registerRequest.userName, Util.hashPassword(registerRequest.password));

                if (customer == null)
                    return StatusCode(401);
                customer.phone = registerRequest.phone;


                customer.personInfo.firstName = registerRequest.firstName;
                customer.personInfo.lastName = registerRequest.lastName;

                if (DateOnly.TryParse(registerRequest.brithDay, out DateOnly brithday))
                {
                    customer.personInfo.brithDay = new DateTime(brithday.Year, brithday.Month, brithday.Day);
                }


                if (registerRequest.brithDay == null)
                    return StatusCode(400, "Invalide BrithDay");

                string? fileName = clsFileHelper.saveImageLocaly(registerRequest.profileImage, clsFileHelper.enFileType.adminProfile);

                if (fileName != null)
                {
                    customer.image = fileName;
                }

                customer.phone = registerRequest.phone;
                customer.token = Util.generateJWt(_config, customer.personID);
                customer.password = Util.hashPassword(registerRequest.newPassword);

                if (customer.personInfo.save())
                {

                    if (customer.save())
                    {
                        return StatusCode(200, "done");
                    }
                }

                return StatusCode(500, "Some Thing Wrong");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Some Thing Wrong");
            }

        }


        [Authorize]
        [HttpGet("/customer/")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult getcustomerDataByToken()
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];


                clsCustomerBuisness? customer = clsCustomerBuisness.findCustomerByToken(token.Split(" ").Last());

                if (customer == null)
                    return StatusCode(401);

                return Ok(CustomerDataDto.convertBuisnessCustomerToDto(customer));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");
            }
        }

    }
}
