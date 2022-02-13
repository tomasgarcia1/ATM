using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Dtos
{
    public class ReporteDto
    {
        public string Fecha { get; set; }
        public string Monto { get; set; }
        public string Balance { get; set; }

        public ReporteDto(Tarjetum tarjeta,long monto)
        {
            Fecha = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            Monto = monto.ToString();
            Balance = tarjeta.Balance.ToString();
        }
    }


}
