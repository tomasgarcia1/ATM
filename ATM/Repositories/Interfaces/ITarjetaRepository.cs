using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface ITarjetaRepository
    {
        Task<Tarjetum> GetByNumero(string numero);
        Task<Tarjetum> GetByNumeroAndPin(string numero, string pin);
        Task SaveChanges();
        Task<Tarjetum> GetById(int id);
    }
}
