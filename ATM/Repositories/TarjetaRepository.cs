using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class TarjetaRepository : ITarjetaRepository
    {
        private readonly ATMContext _context;

        public TarjetaRepository(ATMContext context)
        {
            _context = context;
        }

        public Task<Tarjetum> GetById(int id)
        {
            return _context.Tarjeta.FirstOrDefaultAsync(t => t.Id == id);
        }

        public Task<Tarjetum> GetByNumero(string numero)
        {
            return _context.Tarjeta.FirstOrDefaultAsync(t => t.Numero.Equals(numero));
        }

        public Task<Tarjetum> GetByNumeroAndPin(string numero, string pin)
        {
            return _context.Tarjeta.FirstOrDefaultAsync(t => t.Numero.Equals(numero) && t.Pin.Equals(pin));
        }

        public Task SaveChanges()
        {
          return  _context.SaveChangesAsync();
        }
    }
}
