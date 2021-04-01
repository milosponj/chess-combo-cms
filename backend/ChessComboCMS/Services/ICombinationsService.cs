using ChessComboCMS.Domain;
using ChessComboCMS.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChessComboCMS.Services
{
    public interface ICombinationsService
    {
        Task<Combination> AddCombinationAsync(CreateCombinationRequest combination);
        Task<List<CombinationListItemResponse>> GetAllAsync();
        Task<Combination> GetAsync(int id);
        Task<bool> CombinationExistsAsync(int id);
        Task<List<MintReadyCombinationItem>> GetMintReadyCombinationsAsync();
    }
}