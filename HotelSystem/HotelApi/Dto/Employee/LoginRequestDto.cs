using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Dto
{
    public class LoginRequestDto
    {



        [MaxLength(50)]
        [Required]
        public string userName { get; set; }

        [MaxLength(13)]
        [Required]
        public string password { get; set; }

        [MaxLength(13)]
        [Required]
        public string phone { get; set; }
    }
}