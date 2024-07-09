using System.Text.Json;
using HotelApi.Dto;
using HotelApi.Dto.Employee;
using HotelApi.Global;
using HotelApi.Injuction;
using HotelBuisness;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace HotelApi.Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {

        private IConfig _config;
        public EmployeesController(IConfig config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("/login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult login([FromBody] LoginRequestDto loginRequest)
        {
            try
            {

                clsEmployeeBuisness? employeeHolder = clsEmployeeBuisness.findEmployeeByUserNameAndPassword(loginRequest.userName, Util.hashPassword(loginRequest.password));

                if (employeeHolder == null)
                    return StatusCode(401);


                string token = Util.generateJWt(_config, employeeHolder.personID);

                employeeHolder.token = token;

                switch (employeeHolder.save())
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



        [HttpPost("/update")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult update([FromForm] RegisterRequestDto registerRequest)
        {
            try
            {

                clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByUserNameAndPassword(registerRequest.userName, Util.hashPassword(registerRequest.password));

                if (employee == null)
                    return StatusCode(401);
                employee.phone = registerRequest.phone;
                employee.address = registerRequest.address;

                employee.departmentID = clsDepartmentBuisness.findDepartmentByName(registerRequest.departmentName)?.id ?? 0;

                if (employee.departmentID == 0)
                    return StatusCode(404, "department not exist");

                employee.personInfo.firstName = registerRequest.firstName;
                employee.personInfo.lastName = registerRequest.lastName;

                if (DateOnly.TryParse(registerRequest.brithDay, out DateOnly brithday))
                {
                    employee.personInfo.brithDay = new DateTime(brithday.Year, brithday.Month, brithday.Day);
                }


                if (registerRequest.brithDay == null)
                    return StatusCode(400, "Invalide BrithDay");

                string? fileName = clsFileHelper.saveImageLocaly(registerRequest.profileImage, clsFileHelper.enFileType.adminProfile);

                if (fileName != null)
                {
                    employee.image = fileName;
                }

                employee.phone = registerRequest.phone;
                employee.token = Util.generateJWt(_config, employee.personID);
                employee.password = Util.hashPassword(registerRequest.newPassword);

                if (employee.personInfo.save())
                {

                    if (employee.save())
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


        [HttpGet("/getData")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]

        public IActionResult findEmployeeByToken()
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];


                clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByToken(token.Split(" ").Last());

                if (employee == null)
                    return StatusCode(401);

                return Ok(EmployeeDataDto.convertBuisnessEmployeeToDto(employee));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");
            }
        }

    }
}
