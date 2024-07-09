using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Global
{
    // public enFileType fileType1 { get; set; }

    public class clsFileHelper
    {
        public enum enFileType { adminProfile }

        static string imageFile = "Images";

        private static string generateName()
        {
            return Guid.NewGuid().ToString();
        }

        private static string getFileExtention(string fileName)
        {
            FileInfo file = new FileInfo(fileName);
            return file.Extension;
        }

        private static bool isDirectoryExist(string dirName)
        {
            return Directory.Exists(dirName);
        }

        private static void createDirectory(string dirName)
        {
            Directory.CreateDirectory(imageFile + "//" + dirName);
        }



        public static string? saveImageLocaly(IFormFile? file, enFileType fileType)
        {
            try
            {

                switch (file)
                {
                    case null:
                        {
                            return null;
                        }
                    default:
                        {
                            if (!isDirectoryExist($"{(enFileType)fileType}"))
                                createDirectory($"{(enFileType)fileType}");

                            using (var memory = new MemoryStream())
                            {
                                file.CopyTo(memory);
                                string fileName = imageFile + "//" + (enFileType)fileType + "//" + generateName() + getFileExtention(file.FileName);
                                File.WriteAllBytesAsync(fileName, memory.ToArray());
                                return fileName.Split("//").Last();
                            }
                        }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }

        }

    }
}