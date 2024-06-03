using System.ComponentModel.DataAnnotations;
using VSBDT.Models.Enums;

namespace VSBDT.Models;

public class BookingTable
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid HotelId { get; set; } = Guid.Empty;
    public HotelType HotelType { get; set; }
    public float Cost { get; set; }
    public bool BreakfastIncluded { get; set; }
    public int NumberOfPersons { get; set; }
    public int StayLength { get; set; }
    public DateTime StartDate { get; set; } = default!;
    public DateTime EndDate { get; set;} = default!;
}

public class NewBookingRequest
{
    public Guid HotelId { get; set; } = Guid.Empty;
    public HotelType HotelType { get; set; } = default;
    public bool BreakfastIncluded { get; set; }
    public int NumberOfPersons { get; set; }
    public DateTime StartDate { get; set; } = default!;
    public DateTime EndDate { get; set; } = default!;
}
