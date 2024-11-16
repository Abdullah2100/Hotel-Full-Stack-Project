using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Dto.Room;
using HotelApi.Global;
using HotelBuisness;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HotelApi.Controllers
{
    [Route("[controller]")]
    public class RoomController : Controller
    {
        private readonly ILogger<RoomController> _logger;

        public RoomController(ILogger<RoomController> logger)
        {
            _logger = logger;
        }
        private bool updateAndSaveNewImageToLocalApi(RoomRequestDto roomData, int id)
        {
            try
            {
                List<clsRoomImagesBuisness>? imageList = clsRoomImagesBuisness.getRoomImages(id);

                if (roomData.mainImage != null)
                {
                    clsRoomImagesBuisness? mainImage = clsRoomImagesBuisness.findRoomImageByID(imageList[0].id);
                    if (mainImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[0].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else mainImage = new clsRoomImagesBuisness();

                    string mainImage_holder = clsFileHelper.saveImageLocaly(roomData.mainImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(mainImage_holder))
                        return false;
                    mainImage.image = mainImage_holder;
                    if (!mainImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(mainImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }

                }



                if (roomData.secondImage != null)
                {
                    clsRoomImagesBuisness? secondImage = clsRoomImagesBuisness.findRoomImageByID(imageList[1].id);
                    if (secondImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[1].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else secondImage = new clsRoomImagesBuisness();

                    string mainImage_holder = clsFileHelper.saveImageLocaly(roomData.mainImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(mainImage_holder))
                        return false;
                    secondImage.image = mainImage_holder;
                    if (!secondImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(secondImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }
                }

                if (roomData.thirdImage != null)
                {
                    clsRoomImagesBuisness? thirdImage = clsRoomImagesBuisness.findRoomImageByID(imageList[2].id);
                    if (thirdImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[2].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else thirdImage = new clsRoomImagesBuisness();

                    string mainImage_holder = clsFileHelper.saveImageLocaly(roomData.mainImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(mainImage_holder))
                        return false;
                    thirdImage.image = mainImage_holder;
                    if (!thirdImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(thirdImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }
                }

                if (roomData.forthImage != null)
                {
                    clsRoomImagesBuisness? forthImage = clsRoomImagesBuisness.findRoomImageByID(imageList[3].id);
                    if (forthImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[3].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else forthImage = new clsRoomImagesBuisness();

                    string mainImage_holder = clsFileHelper.saveImageLocaly(roomData.mainImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(mainImage_holder))
                        return false;
                    forthImage.image = mainImage_holder;
                    if (!forthImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(forthImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }
                }

                return true;

            }
            catch (Exception e)
            {
                return false;
            }

        }

        private bool updateAndSaveNewImageToLocalApi(RoomRequestUpdateDto roomData, int id)
        {
            try
            {
                List<clsRoomImagesBuisness>? imageList = clsRoomImagesBuisness.getRoomImages(id);

                if (roomData.mainImage != null)
                {
                    clsRoomImagesBuisness? mainImage = clsRoomImagesBuisness.findRoomImageByID(imageList[0].id);
                    if (mainImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[0].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else mainImage = new clsRoomImagesBuisness();

                    string mainImage_holder = clsFileHelper.saveImageLocaly(roomData.mainImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(mainImage_holder))
                        return false;
                    mainImage.image = mainImage_holder;
                    if (!mainImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(mainImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }

                }



                if (roomData.secondImage != null)
                {
                    clsRoomImagesBuisness? secondImage = clsRoomImagesBuisness.findRoomImageByID(imageList[1].id);
                    if (secondImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[1].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else secondImage = new clsRoomImagesBuisness();

                    string mainImage_holder = clsFileHelper.saveImageLocaly(roomData.secondImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(mainImage_holder))
                        return false;
                    secondImage.image = mainImage_holder;
                    if (!secondImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(secondImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }
                }

                if (roomData.thirdImage != null)
                {
                    clsRoomImagesBuisness? thirdImage = clsRoomImagesBuisness.findRoomImageByID(imageList[2].id);
                    if (thirdImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[2].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else thirdImage = new clsRoomImagesBuisness();

                    string thirdImage_holder = clsFileHelper.saveImageLocaly(roomData.thirdImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(thirdImage_holder))
                        return false;
                    thirdImage.image = thirdImage_holder;
                    if (!thirdImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(thirdImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }
                }

                if (roomData.forthImage != null)
                {
                    clsRoomImagesBuisness? forthImage = clsRoomImagesBuisness.findRoomImageByID(imageList[3].id);
                    if (forthImage != null)
                    {
                        if (imageList.Count > 1)
                            clsFileHelper.deleteImageFromLocaly(imageList[3].image, clsFileHelper.enFileType.room);
                        else
                            return false;
                    }
                    else forthImage = new clsRoomImagesBuisness();

                    string forthImage_holder = clsFileHelper.saveImageLocaly(roomData.forthImage, clsFileHelper.enFileType.room) ?? "";
                    if (string.IsNullOrEmpty(forthImage_holder))
                        return false;
                    forthImage.image = forthImage_holder;
                    if (!forthImage.save())
                    {
                        clsFileHelper.deleteImageFromLocaly(forthImage.image, clsFileHelper.enFileType.room);
                        return false;
                    }
                }

                return true;

            }
            catch (Exception e)
            {
                return false;
            }

        }



        private bool deleteRoomAndImage(int roomId)
        {
            try
            {
                var imagesHolder = clsRoomImagesBuisness.getRoomImages(roomId);
                imagesHolder.ForEach(value => clsFileHelper.deleteImageFromLocaly(value.image, clsFileHelper.enFileType.room));
                if (!clsRoomImagesBuisness.deleteRoomImages(roomId)) return false;
                if (!clsRoomBuisness.deleteRoom(roomId)) return false;
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }


        [Authorize]
        [HttpGet("/rooms")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult getRooms()
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];


                /* clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByToken(token.Split(" ").Last());

                 if (employee == null)
                     return StatusCode(401);

                 var rooms = clsRoomBuisness.getRooms();*/

                return Ok("");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");
            }
        }


        [Authorize]
        [HttpGet("/room/{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult getRoom(int id)
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];


                /*     clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByToken(token.Split(" ").Last());

                     if (employee == null)
                         return StatusCode(401, "User is Not Found");

                     var rooms = clsRoomBuisness.getRoomByID(id);
                     if (rooms == null)
                         return StatusCode(204, "No Room Found");*/

                return Ok("");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");
            }
        }


        [Authorize]
        [HttpDelete("/room/{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult deleteRoom(int id)
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];


                /*clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByToken(token.Split(" ").Last());

                if (employee == null)
                    return StatusCode(401, "User is Not Found");


                if (!deleteRoomAndImage(id))
                    return StatusCode(204, "No Room Found");*/


                return Ok("Room Is Deleted Seccessfuly");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "some thing wrong");
            }
        }


        [Authorize]
        [HttpPost("/room/{id:int}")]
        [ProducesResponseType(201)]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult addRoom(int id)
        {
            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];


                /* clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByToken(token.Split(" ").Last());

                 if (employee == null)
                     return StatusCode(401, "User is Not Found");

                 if (!clsRoomBuisness.deleteRoom(id))
                     return StatusCode(204, "room is Not Found");

                 var roomImages = clsRoomImagesBuisness.getRoomImages(id);*/




                return StatusCode(400, "some thing wrong");


            }
            catch (Exception ex)
            {

                return StatusCode(500, "Some Thing Wrong");

            }

        }



        [Authorize]
        [HttpPut("/room/{id:int}")]
        [ProducesResponseType(201)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public IActionResult updateRoom(int id, [FromForm] RoomRequestUpdateDto roomData)
        {

            try
            {
                string? token = HttpContext.Request.Headers["Authorization"];

                /*
                                clsEmployeeBuisness? employee = clsEmployeeBuisness.findEmployeeByToken(token.Split(" ").Last());

                                if (employee == null)
                                    return StatusCode(401);

                                clsRoomBuisness? room = clsRoomBuisness.getRoomByID(id);
                                if (room == null)
                                    return StatusCode(404, "room not found");

                                room.title = roomData.title ?? "";
                                room.description = roomData.description ?? "";
                                room.capacity = roomData.capacity ?? 0;
                                room.bedNumber = roomData.bedNumber ?? 0;
                                room.pricePerDay = roomData.pricePerDay ?? 0;
                                room.addBy = employee.id;
                                room.floorNumber = roomData.floorNumber ?? 0;
                                clsRoomTypeBuisness? roomTyp = clsRoomTypeBuisness.findRoomTypeByName(roomData.roomType ?? "");
                                if (roomTyp != null)
                                    room.roomTypeID = roomTyp.id;

                                if (room.save())
                                {

                                    if (updateAndSaveNewImageToLocalApi(roomData, id))
                                        return StatusCode(201, "add Done");

                                    return StatusCode(500, "could not save image room");
                                }
                */
                return StatusCode(500, "some thing wrong");


            }
            catch (Exception ex)
            {

                return StatusCode(500, "Some Thing Wrong");

            }



        }






    }


}