using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelApi.Injuction
{
    public class IconfigImplement : IConfig
    {
        IConfiguration _configuration{get;set;}
        public IconfigImplement(IConfiguration configuration){
            _configuration = configuration;
        }
        IConfiguration IConfig.configuration { get => _configuration; set => value = _configuration; }
    }
}