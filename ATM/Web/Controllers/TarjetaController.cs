using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Helpers;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly IJwtHelper _jwtHelper;
        private readonly ITarjetaService _service;

        public TarjetaController(ITarjetaService service, IJwtHelper jwtHelper)
        {
            _jwtHelper = jwtHelper;
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> CheckTarjetaByNumero(string numero)
        {
            try
            {
                var result = await _service.GetByNumero(numero);
                if (result != null)
                {
                    if (result.Bloqueada)
                    {
                        return Ok(new
                        {
                            result = false,
                            message= "La tarjeta se encuentra bloqueada."
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            result = true,
                            message = ""
                        });
                    }

                }
                else
                {
                    return Ok(new
                    {
                        result = false,
                        message = "Numero de tarjeta invalido."
                    });
                }
               
            }
            catch (Exception)
            {
                return StatusCode(500);
            }

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TarjetaLogin tarjeta)
        {
            try
            {
                var tarjetaVerified = await _service.Authenticate(tarjeta.Numero, tarjeta.Pin);
                if (tarjetaVerified != null)
                {
                    if (tarjetaVerified.Bloqueada)
                    {
                        return Ok(new
                        {
                            result = false,
                            message = "Tarjeta bloqueada por exceso de intentos."
                        });
                    }
                    else
                    {
                        var token = _jwtHelper.GenerateToken(tarjetaVerified);
                        return Ok(new
                        {
                            result = true,
                            message = token
                        });
                    }
                }
                else
                {
                    return Ok(new
                    {
                        result = false,
                        message = "PIN invalido."
                    });
                }
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpGet("validate")]
        public IActionResult Validate()
        {
            return Ok();
        }

        [Authorize]
        [HttpGet("balance")]
        public async Task<IActionResult> Balance()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var id = identity.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                var tarjeta = await _service.GetById(Convert.ToInt32(id));

                return Ok(tarjeta);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
           
        }

        [Authorize]
        [HttpPut("withdraw")]
        public async Task<IActionResult> Withdraw([FromForm] string monto)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                var id = identity.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                var reporte = await _service.Withdraw(Convert.ToInt32(id), Convert.ToInt64(monto));

                return Ok(new
                {
                    result = reporte != null,
                    message = reporte != null ? "" : "No hay suficiente saldo para realizar la operacion",
                    reporte = reporte
                
                }) ;
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }


    }
}
