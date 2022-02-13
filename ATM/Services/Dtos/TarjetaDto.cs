using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Dtos
{
    public class TarjetaDto
    {
        public string Numero { get; set; }
        public string Vencimiento { get; set; }
        public string Balance { get; set; }

        public TarjetaDto(Tarjetum tarjeta)
        {
            Numero = tarjeta.Numero;
            Vencimiento = tarjeta.Vencimiento.ToString("MM/yyyy");
            Balance = tarjeta.Balance.ToString();
        }
        public TarjetaDto()
        {
            Numero = "";
            Vencimiento = "";
            Balance = "";
        }
    }
}
