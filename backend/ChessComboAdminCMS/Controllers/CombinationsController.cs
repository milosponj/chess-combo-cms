using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChessComboCMS.Domain;
using ChessComboCMS.Models;
using ChessComboCMS.Services;

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
        public async Task<ActionResult<IEnumerable<CombinationListItemResponse>>> GetCombinations()
        {
            return Ok(await _combinationsService.GetAllAsync());
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
        public async Task<IActionResult> PutCombination(int id, UpdateCombinationRequest combination)
        {
            if (id != combination.Id)
            {
                return BadRequest();
            }

            //_context.Entry(combination).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!CombinationExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

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
