using Microsoft.EntityFrameworkCore;
using VSBDT.Models;

namespace VSBDT.Services;

public class DatabaseContext : DbContext
{
    public DbSet<HotelTable> Hotels { get; set; }
    public DbSet<BookingTable> Bookings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase(databaseName: "VSBDTDb");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HotelTable>().HasData(
            new HotelTable { Id = Guid.NewGuid(), Name = "New York Marriott Marquis", Address = "W 45th St. 7th Ave., New York", Image = "https://i.imgur.com/vFrqNLx.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Hotel Riu Plaza Manhattan Times Square", Address = "W 47th St. 7th Ave., New York", Image = "https://i.imgur.com/mlBY7a0.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Hard Rock Hotel New York", Address = "W 48th St. 7th Ave., New York", Image = "https://i.imgur.com/wUWfyWZ.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Grand Baltic Dunes", Address = "Birutės Al. 26, Palanga", Image = "https://i.imgur.com/fT3qhR7.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Mana Suites & Sea", Address = "M. Valančiaus St. 1, Palanga", Image = "https://i.imgur.com/eVAJuCQ.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Ivolita Vilnius", Address = "Geliu St. 5, Vilnius", Image = "https://i.imgur.com/VQLQwaJ.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Old Town Trio", Address = "Raugyklos St. 15A, Vilnius", Image = "https://i.imgur.com/5jtF8cj.jpeg" },
            new HotelTable { Id = Guid.NewGuid(), Name = "Moxy Kaunas Center", Address = "Maironio St. 19, Kaunas", Image = "https://i.imgur.com/fNHJnDh.jpeg" });
    }
}