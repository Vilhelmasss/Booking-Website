using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VSBDT.Services;
using VSBDT.Models.Enums;

namespace VSBDT.Controllers;

[ApiController]
public class HotelController : ControllerBase
{
    private readonly DatabaseContext _dbContext;

    public HotelController(DatabaseContext dbcontext)
    {
        _dbContext = dbcontext;
    }
    
    [HttpGet]
    [Route("GetHotelList")]
    public async Task<IActionResult> GetHotelList()
    {
        _dbContext.Database.EnsureCreated();
        return Ok(await _dbContext.Hotels.ToListAsync());
    }

    [HttpGet]
    [Route("GetHotel/{id}")]
    public async Task<IActionResult> GetHotel(Guid id)
    {
        _dbContext.Database.EnsureCreated();
        var hotel = await _dbContext.Hotels.FirstOrDefaultAsync(h => h.Id == id);
        if (hotel is null) {
            return NotFound();
        }   
        return Ok(hotel);
    }

    [HttpGet]
    [Route("GetHotelPrice")]
    public IActionResult GetHotelPrice(
        [FromQuery] HotelType roomType,
        [FromQuery] bool breakfastIncluded,
        int numberOfPersons,
        DateTime startDate,
        DateTime endDate)
    {
        float hotelPrice = HotelCalculator.GetHotelPrice(roomType, breakfastIncluded, numberOfPersons, startDate, endDate);
        return Ok(hotelPrice);
    }
}
