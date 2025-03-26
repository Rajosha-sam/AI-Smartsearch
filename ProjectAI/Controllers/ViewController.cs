using Domain.MODEL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAI.DataContext;

namespace ProjectAI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewController : ControllerBase
    {
        private readonly UserDbContext dbcontext;

        public ViewController(UserDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        public async Task<IActionResult>get()
        {
            var result = dbcontext.rule.ToList();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>post(Rule model)
        {
           dbcontext.rule.Add(model);
           await dbcontext.SaveChangesAsync();
            return Ok(model);
        }


        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> delete(int id)
        {
            var deleterecord = await dbcontext.rule.FindAsync(id);
            dbcontext.rule.Remove(deleterecord);
            await dbcontext.SaveChangesAsync();
            return Ok(deleterecord);
        }
    }
}
