
using System.ComponentModel.DataAnnotations;

namespace HotelApi.Dto.Employee
{
    public class RegisterRequestDto
    {
        [MaxLength(50)]
        [Required]
        public string userName { get; set; }

        [MaxLength(13)]
        [Required]
        public string password { get; set; }

        [Required]
        public int departmentID { get; set; }

        [Required]
        public int personID { get; set; }

        [MaxLength(200)]
        [Required]
        public string address { get; set; }

        [MaxLength(13)]
        [Required]
        public string phone { get; set; }
    }
}