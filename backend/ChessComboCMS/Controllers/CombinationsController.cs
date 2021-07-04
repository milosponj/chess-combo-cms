using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChessComboCMS.Domain;
using ChessComboCMS.Models;
using ChessComboCMS.Services;
using System.Linq;

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


        [HttpGet]
        [Route("mintReady")]
        public async Task<ActionResult<IEnumerable<MintReadyCombinationItem>>> GetMintReadyCombinations()
        {
            // Combo NFTs are minted from combinations (difference between the two is like a difference between a physical car and a blueprint of a car)
            // Combo NFT is a physical car, something that phyisically exists on blockchain and it's unchangeable
            // Combination is just a blueprint used for creating (= minting) Combos
            var mintReadyCombinations = await _combinationsService.GetMintReadyCombinationsAsync();
            return Ok(mintReadyCombinations);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CombinationListItemResponse>>> GetCombinations()
        {
            return Ok((await _combinationsService.GetAllAsync()).OrderBy(c=>c.Id));
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
