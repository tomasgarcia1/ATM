using Entities.Models;
using Repositories.Interfaces;
using Services.Dtos;
using Services.Enums;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class TarjetaService : ITarjetaService
    {
        private readonly ITarjetaRepository _repository;
        private readonly IOperacionRepository _repositoryOperacion;

        public TarjetaService(ITarjetaRepository repository, IOperacionRepository operacionRepository)
        {
            _repository = repository;
            _repositoryOperacion = operacionRepository;
        }

        public async Task<Tarjetum> Authenticate(string numero, string pin)
        {
           var tarjeta = await _repository.GetByNumeroAndPin(numero, pin);
            if(tarjeta is null)
            {
                var target = await _repository.GetByNumero(numero);
                if(target != null)
                {
                    target.Intentos++;
                    if (target.Intentos >= 4)
                    {
                        target.Bloqueada = true;
                        await _repository.SaveChanges();
                        return target;
                    }
                    await _repository.SaveChanges();
                }
            }
            else
            {
                tarjeta.Intentos = 0;
                await _repository.SaveChanges();

            }
            return tarjeta;
        }

        public async Task<Tarjetum> GetByNumero(string numero)
        {
            var tarjeta = await _repository.GetByNumero(numero);
            return tarjeta;
        }

        public async Task<TarjetaDto> GetById(int id)
        {
            var tarjeta = await _repository.GetById(id);
            if(tarjeta!= null)
            {
               await _repositoryOperacion.Add(new Operacion()
                {
                    TarjetaId =tarjeta.Id,
                    TipoId = (byte)TipoOperacion.Balance,
                    Descripcion = "Balance",
                    Fecha  = DateTime.Now
                });
                await _repository.SaveChanges();
                return new TarjetaDto(tarjeta);
            }
            return new TarjetaDto();
        }

        public async Task<ReporteDto> Withdraw(int id, long monto)
        {
            var tarjeta = await _repository.GetById(id);
            if(tarjeta != null)
            {
                if(tarjeta.Balance - monto >= 0)
                {
                    tarjeta.Balance = tarjeta.Balance - monto;
                    await _repositoryOperacion.Add(new Operacion()
                    {
                        TarjetaId = tarjeta.Id,
                        TipoId = (byte)TipoOperacion.Retiro,
                        Descripcion = $"Retiro: ${monto}",
                        Fecha = DateTime.Now

                    });
                   await _repository.SaveChanges();
                    return new ReporteDto(tarjeta, monto);
                }
                else
                {
                    return null;
                }
            }
            return null;
        }
    }
}
