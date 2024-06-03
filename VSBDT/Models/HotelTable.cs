using System.ComponentModel.DataAnnotations;

namespace VSBDT.Models;

public class HotelTable
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}
