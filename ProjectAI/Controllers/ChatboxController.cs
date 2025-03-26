using Domain.MODEL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectAI.DataContext;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatboxController : ControllerBase
    {
        private readonly UserDbContext dbcontext;

        public ChatboxController(UserDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string name)
        {
            try
            {
                var result = await dbcontext.rule
                    .Where(r => r.Name.Contains(name) ) 
                    .Select(r => new
                    {
                        Name = r.Name,
                        Description = r.Description,
                        Time = DateTime.Now
                    })
                    .ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
