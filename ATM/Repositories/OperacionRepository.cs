using Entities.Models;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OperacionRepository : IOperacionRepository
    {
        private readonly ATMContext _context;

        public OperacionRepository(ATMContext context)
        {
            _context = context;
        }

        public async Task Add(Operacion operacion)
        {
            await _context.AddAsync(operacion);
        }


    }
}
