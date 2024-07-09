using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Attributs
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class clsFileValidationAttibute : ValidationAttribute
    {
        public override string FormatErrorMessage(string name)
        {
            return name;
        }


        public override bool IsValid(object? value)
        {
            if (value == null) return true;
            IFormFile? file = value as IFormFile;
            string fileExtention = new FileInfo(file!.FileName).Extension;
            if ((fileExtention == ".png" || fileExtention == ".jpg")) return true;
            return false;

        }

    }
}