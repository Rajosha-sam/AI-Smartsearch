using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using Domain.MODEL;
using log4net.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ProjectAI.DataContext;
using ProjectAI.DTO;

namespace ProjectAI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext dbcontext;
        private readonly IConfiguration configuration;
        private readonly ILogger<UserController> logger;

        public UserController(UserDbContext dbcontext,IConfiguration configuration,ILogger<UserController>logger)
        {
            this.dbcontext = dbcontext;
            this.configuration = configuration;
            this.logger = logger;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                //logger.LogInformation("informa");
                //int a = 0;
                //int b = 10 / a;
                var result = dbcontext.user.Include(i => i.Authorize).Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.Place,
                    u.Password,
                    AuthorizeId = u.Authorize.Name

                }).ToList();

                return Ok(result);
            }
            catch(Exception ex)
            {
                logger.LogError("if error comes display" +ex);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> Get(int id)

        {
            try
            {

                logger.LogInformation
                    ("get ");
                var result = await dbcontext.user.FindAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> post(UserRequestDto model)
        {
            try
            {

                var user = new User()
                {
                    Name = model.Name,
                    Email = model.Email,
                    Password = model.Password,
                    Place = model.Place,
                    AuthorizeId = model.AuthorizeId
                };

                dbcontext.user.Add(user);
                await dbcontext.SaveChangesAsync();

                return Ok(user);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> put(int id, UserRequestDto model)
        {
            try
            {
                var updateRecord = await dbcontext.user.FirstOrDefaultAsync(i => i.Id == id);
                if (updateRecord == null)
                {
                    return NotFound();
                }

                updateRecord.Email = model.Email;
                updateRecord.Name = model.Name;
                updateRecord.Place = model.Place;
                updateRecord.Password = model.Password;
                updateRecord.AuthorizeId = model.AuthorizeId;

                await dbcontext.SaveChangesAsync();
                return Ok(updateRecord);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            }






        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {


                var deleterecord = await dbcontext.user.FindAsync(id);
                dbcontext.user.Remove(deleterecord);
                await dbcontext.SaveChangesAsync();
                return Ok(deleterecord);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{email}/{password}")]
        public async Task<IActionResult>Login(string email,string password)
        {
            var result = new LoginResponseDto();
            var user = await dbcontext.user.FirstOrDefaultAsync(i => i.Email == email && i.Password == password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");  
            }
            result.Name = user.Name;
            result.AuthorizeID = user.AuthorizeId; 


            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Name, email)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            result.Token = new JwtSecurityTokenHandler().WriteToken(token);
         

            return Ok(result);

        }


        


    }
}
