using ChessComboCMS.Data;
using ChessComboCMS.Domain;
using ChessComboCMS.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Services
{
    public class CombinationsService : ICombinationsService
    {
        private readonly ChessComboCMSContext _context;

        public CombinationsService(ChessComboCMSContext context)
        {
            _context = context;
        }

        public async Task<Combination> AddCombinationAsync(CreateCombinationRequest request)
        {
            var combination = new Combination()
            {
                GameId = request.GameId,
                PlayerId = request.PlayerId,
                Moves = request.Combination,
                Description = request.Description
            };

            _context.Add(combination);
            await _context.SaveChangesAsync();

            return combination;
        }

        public async Task<bool> CombinationExistsAsync(int id)
        {
            return await _context.Combinations.AnyAsync(c => c.Id == id);
        }

        public async Task<List<CombinationListItemResponse>> GetAllAsync()
        {
            var combs = await _context.Combinations.Include(c=>c.Game).ThenInclude(g=>g.WhitePlayer).Include(c => c.Game).ThenInclude(g => g.BlackPlayer).Include(c=>c.Player).ToListAsync();
            var res = combs.Select(c => new CombinationListItemResponse()
            {
                WhitePlayerName = c.Game.WhitePlayer?.FullName,
                BlackPlayerName = c.Game.BlackPlayer?.FullName,
                OwnerPlayerName = c.Player?.FullName,
                Description = c.Description,
                GameDate = c.Game.Date.HasValue ? c.Game.Date.Value.ToString("dd. MMMM yyyy") : "",
                NumberOfMoves = c.Moves.Count(),
                Id = c.Id
            }).ToList();
            return res;
        }



        public async Task<Combination> GetAsync(int id)
        {
            return await _context.Combinations.FindAsync(id);
        }

        public async Task<List<MintReadyCombinationItem>> GetMintReadyCombinationsAsync()
        {
            var retval = new List<MintReadyCombinationItem>();
            var combinations = await _context.Combinations.Include(c=> c.Player).Include(c=>c.Game).ThenInclude(g=>g.BlackPlayer).Include(c => c.Game).ThenInclude(g => g.WhitePlayer).ToListAsync();

            foreach (var combination in combinations)
            {
                var r = new MintReadyCombinationItem()
                {
                    BirthDate = combination.Player.DateOfBirth.HasValue ? combination.Player.DateOfBirth.Value.ToOurString() : "",
                    BirthPlace = combination.Player.PlaceOfBirth,
                    BlackPlayerFullName = combination.Game.BlackPlayer.FullName,
                    WhitePlayerFullName = combination.Game.WhitePlayer.FullName,
                    Date = combination.Game.Date.HasValue ? combination.Game.Date.Value.ToOurString() : "",
                    GameTitle = combination.Game.Title,
                    GameVenue = combination.Game.Venue,
                    Moves = JsonConvert.SerializeObject(combination.Moves.Select(m=>m.Fen)),
                    PlayerFullName = combination.Player.FullName
                };
                retval.Add(r);
            }

            return retval;
        }

        public async Task UpdateCombinationAsync(Combination combination)
        {
            _context.Entry(combination).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}
