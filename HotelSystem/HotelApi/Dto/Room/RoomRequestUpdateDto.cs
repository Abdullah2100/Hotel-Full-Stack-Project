using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Attributs;

namespace HotelApi.Dto.Room
{
    public class RoomRequestUpdateDto
    {
        public sbyte? capacity { get; set; }

        public sbyte? bedNumber { get; set; }

        public double? pricePerDay { get; set; }



        public short? floorNumber { get; set; }

        public string? roomType { get; set; }

        [MaxLength(20)]
        public string? title { get; set; }

        public string? description { get; set; }

        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? mainImage { get; set; } = null;

        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? secondImage { get; set; } = null;

        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? thirdImage { get; set; } = null;

        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? forthImage { get; set; } = null;
    }
}