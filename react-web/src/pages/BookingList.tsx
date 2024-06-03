import React, { useState, useEffect } from "react";
import { Booking } from "../types/Booking";

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5177/Booking/GetBookingList`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Booking List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Hotel Type</th>
              <th className="py-2 px-4 border-b">Breakfast Included</th>
              <th className="py-2 px-4 border-b">Number of Persons</th>
              <th className="py-2 px-4 border-b">Stay Length</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Cost</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr>
                <td className="py-2 px-4 border-b">{booking.hotelType}</td>
                <td className="py-2 px-4 border-b">
                  {booking.breakfastIncluded ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.numberOfPersons}
                </td>
                <td className="py-2 px-4 border-b">{booking.stayLength}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{booking.cost}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
