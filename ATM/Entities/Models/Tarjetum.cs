using System;
using System.Collections.Generic;

#nullable disable

namespace Entities.Models
{
    public partial class Tarjetum
    {
        public Tarjetum()
        {
            Operacions = new HashSet<Operacion>();
        }

        public int Id { get; set; }
        public string Numero { get; set; }
        public string Pin { get; set; }
        public bool Bloqueada { get; set; }
        public long Balance { get; set; }
        public DateTime Vencimiento { get; set; }
        public int Intentos { get; set; }

        public virtual ICollection<Operacion> Operacions { get; set; }
    }
}
