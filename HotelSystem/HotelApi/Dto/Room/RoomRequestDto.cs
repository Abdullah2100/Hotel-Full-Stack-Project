using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using HotelApi.Attributs;

namespace HotelApi.Dto.Room
{
    public class RoomRequestDto
    {
        [Required]
        public sbyte capacity { get; set; }

        [Required]
        public sbyte bedNumber { get; set; }

        [Required]
        public double pricePerDay { get; set; }



        [Required]
        public short floorNumber { get; set; }

        [Required]
        public string roomType { get; set; }

        [Required]
        [MaxLength(20)]
        public string title { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? mainImage { get; set; } = null;

        [Required]
        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? secondImage { get; set; } = null;

        [Required]
        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? thirdImage { get; set; } = null;

        [Required]
        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? forthImage { get; set; } = null;
    }
}