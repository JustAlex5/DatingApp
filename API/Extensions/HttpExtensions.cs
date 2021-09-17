using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HtttpExtansions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemPerPage,
            int totalItems, int totalPage)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemPerPage, totalItems, totalPage);

            var option = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination",JsonSerializer.Serialize(paginationHeader,option));
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }
    }
}