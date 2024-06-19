using System;
using System.Collections.Generic;
using HotelData.connectionID;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace HotelData.connectionID
{
    public class clsConnectionOperation 
    {

            public static IConfiguration connectionString =  new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();
          
        
    }
}