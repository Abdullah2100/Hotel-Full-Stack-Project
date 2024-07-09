
using System.ComponentModel.DataAnnotations;
using HotelApi.Attributs;
using Newtonsoft.Json.Serialization;

namespace HotelApi.Dto.Employee
{
    public class RegisterRequestDto
    {
        [MaxLength(50)]
        [Required]
        public string firstName { get; set; }

        [MaxLength(50)]
        [Required]
        public string lastName { get; set; }

        [MaxLength(50)]
        [Required]
        public string userName { get; set; }

        [MaxLength(13)]
        [Required]
        public string password { get; set; }

        [MaxLength(13)]
        [Required]
        public string newPassword { get; set; }

        [Required]
        public string departmentName { get; set; }



        [MaxLength(200)]
        [Required]
        public string address { get; set; }

        [Required]
        public string brithDay { get; set; }

        [MaxLength(13)]
        [Required]
        public string phone { get; set; }


        [clsFileValidationAttibute(ErrorMessage = "File Type is Not Supported")]
        public IFormFile? profileImage { get; set; }
    }
}