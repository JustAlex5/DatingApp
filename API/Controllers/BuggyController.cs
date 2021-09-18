﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<String> GetSecret()
        {
            return "secret text";
        }



        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<String> GetServerError()
        {
         
                var thing = _context.Users.Find(-1);

               return thing.ToString();
        }

        [HttpGet("bad-request")]
        public ActionResult<String> GetBadRequest()
        {
            return BadRequest();
        }
    }
}
