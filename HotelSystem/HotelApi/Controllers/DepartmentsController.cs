using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Dto.Employee;
using HotelBuisness;
using HotelData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HotelApi.Controllers
{
    [Route("[controller]")]
    public class DepartmentsController : Controller
    {
        private readonly ILogger<DepartmentsController> _logger;

        public DepartmentsController(ILogger<DepartmentsController> logger)
        {
            _logger = logger;
        }

        // [AllowAnonymous]
        [Authorize]
        [HttpGet("/department/all")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult getDepartments()
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];

                if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);
                var departments = clsDepartmentBuisness.getDepartments();
                return Ok(departments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }

        [Authorize]
        [HttpPost("/department/")]
        [ProducesResponseType(201)]
        [ProducesResponseType(401)]
        [ProducesResponseType(406)]
        [ProducesResponseType(500)]
        public IActionResult addDepartment(string name)
        {
            try
            {

                string? token = HttpContext.Request.Headers["Authorization"];

                if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);
                clsDepartmentBuisness depatment = clsDepartmentBuisness.findDepartmentByName(name);
                if (depatment != null)
                    return StatusCode(406, "department name is already exist");
                depatment = new clsDepartmentBuisness();
                depatment.name = name;

                depatment.save();

                return StatusCode(201, "add seccsfuly");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }


        [Authorize]
        [HttpPut("/department")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(406)]
        [ProducesResponseType(500)]
        public IActionResult updateDepartment([FromBody] DepartmentDataDto departmentData)
        {
            try
            {

                string? token = HttpContext.Request.Headers["Authorization"];

                if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);
                clsDepartmentBuisness depatment = clsDepartmentBuisness.findDepartmentByID(departmentData.id);
                if (depatment == null)
                    return StatusCode(406, "department name is already exist");

                depatment.name = departmentData.name;

                depatment.save();

                return Ok("add seccsfuly");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }




        [Authorize]
        [HttpDelete("/department/{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult deleteDepartment(int id)
        {
            try
            {

                string? token = HttpContext.Request.Headers["Authorization"];

                if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);

                if (!clsDepartmentBuisness.isDepartmentExistByID(id))
                    return StatusCode(404, "could not find Department");



                if (clsDepartmentBuisness.deleteDepartment(id))
                {
                    return Ok("update  seccsfuly");
                }

                return StatusCode(500, "some thing wrong");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }

    }
}