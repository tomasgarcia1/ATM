using Entities.Models;
using Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ITarjetaService
    {
        Task<Tarjetum> GetByNumero(string numero);
        Task<Tarjetum> Authenticate(string numero, string pin);
        Task<TarjetaDto> GetById(int id);
        Task<ReporteDto> Withdraw(int v, long monto);
    }
}
