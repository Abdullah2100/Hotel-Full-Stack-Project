using HotelApi.Dto;
using HotelApi.Dto.Employee;
using HotelApi.Global;
using HotelApi.Injuction;
using HotelBuisness;
using Microsoft.AspNetCore.Mvc;

namespace HotelApi.Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private IConfig _config;
        public EmployeesController(IConfig config)
        {
            _config = config;
        }

        [HttpPost]
        public IActionResult login([FromBody] LoginRequestDto loginRequest)
        {
            try
            {

                clsEmployeeBuisness? employeeHolder = clsEmployeeBuisness.findEmployeeByUserNameAndPassword(loginRequest.userName, Util.hashPassword(loginRequest.password));

                if (employeeHolder == null)
                    return NotFound();

                string token = Util.generateJWt(_config, employeeHolder.personID);

                employeeHolder.token = token;

                switch (employeeHolder.save())
                {
                    case true:
                        {
                            return Ok(token);
                        }
                    default:
                        {
                            return StatusCode(500);
                        }
                }
            }
            catch (Exception eror)
            {
                return StatusCode(500, eror.Message);
            }
        }

        [HttpGet]
        public IActionResult register([FromBody] RegisterRequestDto registerRequest)
        {
            try
            {

                clsEmployeeBuisness employee = new clsEmployeeBuisness();

                employee.userName = registerRequest.userName;
                employee.password = Util.hashPassword(registerRequest.userName);
                employee.phone = registerRequest.phone;
                employee.address = registerRequest.address;
                employee.departmentID = registerRequest.departmentID;
                employee.personID = registerRequest.personID;
                employee.phone = registerRequest.phone;
                employee.token = Util.generateJWt(_config, employee.personID);

                if (employee.save())
                {
                    return Ok(employee.token);

                }

                return StatusCode(500, "Could not Create Employee");




            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);


            }


            return Ok("nice");
        }
    }
}
