using System;
using System.Collections.Generic;

#nullable disable

namespace Entities.Models
{
    public partial class Operacion
    {
        public int Id { get; set; }
        public int TarjetaId { get; set; }
        public byte TipoId { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }

        public virtual Tarjetum Tarjeta { get; set; }
    }
}
