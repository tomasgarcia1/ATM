﻿using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Helpers
{
    public interface IJwtHelper
    {
        string GenerateToken(Tarjetum tarjeta);
    }
}
