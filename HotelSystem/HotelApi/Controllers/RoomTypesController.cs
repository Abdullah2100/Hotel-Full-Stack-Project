using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Dto.Employee;
using HotelBuisness;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HotelApi.Controllers
{
    [Route("[controller]")]
    public class RoomTypesController : Controller
    {
        private readonly ILogger<RoomTypesController> _logger;

        public RoomTypesController(ILogger<RoomTypesController> logger)
        {
            _logger = logger;
        }
        [Authorize]
        [HttpGet("/roomType/all")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]

        public IActionResult getRoomTypes()
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];

                /*if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);
                var roomTypes = clsRoomTypeBuisness.getRoomTypes();
                */
                return Ok("");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }

        [Authorize]
        [HttpPost("/roomType")]
        [ProducesResponseType(201)]
        [ProducesResponseType(401)]
        [ProducesResponseType(406)]
        [ProducesResponseType(500)]
        public IActionResult addRoomType(string name)
        {
            try
            {

                string? token = HttpContext.Request.Headers["Authorization"];

                /*if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);
                clsRoomTypeBuisness roomType = clsRoomTypeBuisness.findRoomTypeByName(name);
                if (roomType != null)
                    return StatusCode(406, "roomType name is already exist");
                roomType = new clsRoomTypeBuisness();
                roomType.name = name;

                roomType.save();*/

                return StatusCode(201, "add seccsfuly");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }


        [Authorize]
        [HttpPut("/roomType")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(406)]
        [ProducesResponseType(500)]
        public IActionResult updateRoomType([FromBody] RoomTypeDataDto departmentData)
        {
            try
            {

                string? token = HttpContext.Request.Headers["Authorization"];

                /* if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                     return StatusCode(401);
                 clsRoomTypeBuisness roomType = clsRoomTypeBuisness.findRoomTypeByID(departmentData.id);
                 if (roomType == null)
                     return StatusCode(406, "roomType name is already exist");

                 roomType.name = departmentData.name;

                 roomType.save();*/

                return Ok("add seccsfuly");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }




        [Authorize]
        [HttpDelete("/roomType/{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult deleteRoomType(int id)
        {
            try
            {

                string? token = HttpContext.Request.Headers["Authorization"];

                /*if (!clsEmployeeBuisness.isEmployeeExistByToken(token.Split(" ").Last()))
                    return StatusCode(401);


                if (!clsRoomTypeBuisness.isRoomTypeExistByID(id))
                    return StatusCode(404, "room Type not found");


                if (clsRoomTypeBuisness.deleteRoomType(id))
                {
                    return Ok("update  seccsfuly");
                }*/

                return StatusCode(500, "some thing wrong");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");

            }
        }

    }
}