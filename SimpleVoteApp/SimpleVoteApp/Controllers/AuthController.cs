using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleVoteApp.Helpers;
using SimpleVoteApp.Models;


namespace SimpleVoteApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly MyAppDBContext _context;
        private readonly JwtService _jwtService;

        public AuthController(MyAppDBContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        //POST: api/login
        [HttpPost("login")]
        public async Task<ActionResult> Login(User user)
        {
            var relUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName);
            if (relUser == null)
                return BadRequest(new { message = "Username not exist" });
            if (!BCrypt.Net.BCrypt.Verify(user.Password, relUser.Password))
                return BadRequest(new { message = "Wrong password" });
                //return BadRequest(new { m1 = user.Password, m2 = relUser.Password });

            var jwt = _jwtService.Generate(relUser.Iduser);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
            });

            return Ok(new { jwt =jwt, user = relUser });
        }

        //GET: api/user
        [HttpGet("user")]
        public async Task<ActionResult> User ()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = await _context.Users.FindAsync(userId);

                return Ok(user);
            }
            catch(Exception e)
            {
                return Unauthorized();
            }

        }

        //POST: api/logout
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }
    }
}
