﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChessComboCMS.Data;
using ChessComboCMS.Domain;
using ChessComboCMS.Models;

namespace ChessComboCMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly ChessComboCMSContext _context;

        public GamesController(ChessComboCMSContext context)
        {
            _context = context;
        }

        // GET: api/Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.Include(g => g.WhitePlayer).Include(g => g.BlackPlayer).ToListAsync();
        }


        [HttpGet]
        [Route("list")]
        public async Task<ActionResult<IEnumerable<GameListItemResponse>>> GetGamesList()
        {
            var games = await _context.Games.Include(g => g.WhitePlayer).Include(g => g.BlackPlayer).ToListAsync();
            var list = games.Select(g => new GameListItemResponse()
            {
                BlackPlayerName = $"{g.BlackPlayer.FirstName} {g.BlackPlayer.LastName}",
                WhitePlayerName = $"{g.WhitePlayer.FirstName} {g.WhitePlayer.LastName}",
                Date = g.Date,
                Description = g.Description,
                Id = g.Id
            });

            return Ok(list);
        }

        // GET: api/Games/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games.Include(g => g.WhitePlayer).Include(g => g.BlackPlayer).FirstOrDefaultAsync(g=>g.Id == id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // PUT: api/Games/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Games
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.Id }, game);
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteGame(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return game;
        }

        private bool GameExists(int id)
        {
            return _context.Games.Any(e => e.Id == id);
        }
    }
}
