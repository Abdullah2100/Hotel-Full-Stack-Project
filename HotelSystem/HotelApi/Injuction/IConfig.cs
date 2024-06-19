using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Injuction
{
    public interface IConfig
    {
        public IConfiguration configuration{ get; set;}
    }
}