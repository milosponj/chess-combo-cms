using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChessComboCMS.Domain;
using ChessComboCMS.Models;
using ChessComboCMS.Services;
using System.Linq;
using System.Text.Json;

namespace ChessComboCMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CombinationsController : ControllerBase
    {
        private readonly ICombinationsService _combinationsService;

        public CombinationsController(ICombinationsService combinationService)
        {
            _combinationsService = combinationService;
        }

        /// <summary>
        /// TODO This should be authorized call and only called from Portal
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("fullData")]
        public async Task<ActionResult<IEnumerable<Combination>>> GetFullDataOfAllCombinations()
        {
            var combinations = await _combinationsService.GetAllAsync();
            var response = combinations.Select(c => CombinationFullDataResponse.FromCombination(c));
            return Ok(response);
        }

        /// <summary>
        /// This should be authorized call and only called from Minter
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("mintReady")]
        public async Task<ActionResult<IEnumerable<Combination>>> GetMintReadyCombinations()
        {
            var combinations = await _combinationsService.GetAllAsync();
            var mintReadyCombinations = new List<MintReadyCombinationItem>();
            foreach (var combination in combinations)
            {
                var r = new MintReadyCombinationItem()
                {
                    CmsId = $"{combination.Id}",
                    BirthDate = combination.Player.DateOfBirth.HasValue ? combination.Player.DateOfBirth.Value.ToOurString() : "",
                    BirthPlace = combination.Player.PlaceOfBirth,
                    BlackPlayerFullName = combination.Game.BlackPlayer.FullName,
                    WhitePlayerFullName = combination.Game.WhitePlayer.FullName,
                    Date = combination.Game.Date.HasValue ? combination.Game.Date.Value.ToOurString() : "",
                    GameTitle = combination.Game.Title,
                    GameVenue = combination.Game.Venue,
                    Moves = JsonSerializer.Serialize(combination.Moves.OrderBy(m=>m.Number).Select(m => m.Fen).ToList()),
                    PlayerFullName = combination.Player.FullName
                };
                mintReadyCombinations.Add(r);
            }

            return Ok(mintReadyCombinations);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CombinationListItemResponse>>> GetCombinations()
        {
            var allCombinations = await _combinationsService.GetAllAsync();
            var res = allCombinations.Select(c => new CombinationListItemResponse()
            {
                WhitePlayerName = c.Game.WhitePlayer?.FullName,
                BlackPlayerName = c.Game.BlackPlayer?.FullName,
                OwnerPlayerName = c.Player?.FullName,
                Description = c.Description,
                GameDate = c.Game.Date.HasValue ? c.Game.Date.Value.ToString("dd. MMMM yyyy") : "",
                NumberOfMoves = c.Moves.Count(),
                Id = c.Id
            }).ToList();
            return Ok(res.OrderBy(c=>c.Id));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Combination>> GetCombination(int id)
        {
            var combination = await _combinationsService.GetAsync(id);

            if (combination == null)
            {
                return NotFound();
            }

            return combination;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCombination(int id, UpdateCombinationRequest combinationUpdateRequest)
        {
            if (id != combinationUpdateRequest.Id)
            {
                return BadRequest();
            }

            var combination = await _combinationsService.GetAsync(id);

            if (combination == null)
            {
                return BadRequest("Combination not found");
            }

            combination.Description = combinationUpdateRequest.Description;
            combination.GameId = combinationUpdateRequest.GameId;
            combination.Moves = combinationUpdateRequest.Combination;
            combination.PlayerId = combinationUpdateRequest.PlayerId;

            await _combinationsService.UpdateCombinationAsync(combination);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Combination>> CreateCombination(CreateCombinationRequest request)
        {
            var combination = await _combinationsService.AddCombinationAsync(request);

            return CreatedAtAction("CreateCombination", new { id = combination.Id }, combination);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Combination>> DeleteCombination(int id)
        {
            //var moveSet = await _context.Combinations.FindAsync(id);
            //if (moveSet == null)
            //{
            //    return NotFound();
            //}

            //_context.Combinations.Remove(moveSet);
            //await _context.SaveChangesAsync();
            return Ok();
            //return moveSet;
        }

        private async Task<bool> CombinationExists(int id)
        {
            return await _combinationsService.CombinationExistsAsync(id);
        }
    }
}
