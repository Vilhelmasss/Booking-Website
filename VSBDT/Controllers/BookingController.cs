using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VSBDT.Models;
using VSBDT.Services;

namespace VSBDT.Controllers;

[ApiController]
[Route("Booking")]
public class BookingController : ControllerBase
{
    private readonly DatabaseContext _dbContext;

    public BookingController(DatabaseContext dbcontext)
    {
        _dbContext = dbcontext;
    }

    [HttpPost]
    [Route("CreateBooking")]
    public async Task<IActionResult> CreateBooking([FromBody] NewBookingRequest bookingRequest)
    {
        var booking = new BookingTable
        {
            Id = Guid.NewGuid(),
            HotelId = bookingRequest.HotelId,
            HotelType = bookingRequest.HotelType,
            Cost = HotelCalculator.GetHotelPrice(
                bookingRequest.HotelType,
                bookingRequest.BreakfastIncluded,
                bookingRequest.NumberOfPersons,
                bookingRequest.StartDate,
                bookingRequest.EndDate),
            BreakfastIncluded = bookingRequest.BreakfastIncluded,
            NumberOfPersons = bookingRequest.NumberOfPersons,
            StayLength = HotelCalculator.GetStayLength(bookingRequest.StartDate, bookingRequest.EndDate),
            StartDate = bookingRequest.StartDate,
            EndDate = bookingRequest.EndDate
        };

        _dbContext.Bookings.Add(booking);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpGet]
    [Route("GetBookingList")]
    public async Task<IActionResult> GetBooking()
    {
        _dbContext.Database.EnsureCreated();
        return Ok(await _dbContext.Bookings.ToListAsync());
    }
}
