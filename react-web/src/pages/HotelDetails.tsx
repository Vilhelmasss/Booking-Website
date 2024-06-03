import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Hotel } from "../types/Hotel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string>("Standard");
  const [breakfastIncluded, setBreakfastIncluded] = useState<boolean>(false);
  const [price, setPrice] = useState<number | null>(null);
  const [numberOfPersons, setNumberOfPersons] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const submitForm = () => {
    const body: object = {
      hotelId: id,
      hotelType: selectedRoomType,
      breakfastIncluded: breakfastIncluded,
      numberOfPersons: numberOfPersons,
      startDate: startDate,
      endDate: endDate,
    };

    fetch("http://localhost:5177/Booking/CreateBooking", {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
    });
  };

  const PriceBox = ({ price }: { price: number | null }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 mt-6 text-center justify-center flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Total Price</h3>
        <div className="text-2xl mb-4">
          {price !== null ? `${price}€` : "Mark Something..."}
        </div>
        <button
          type="submit"
          onClick={submitForm}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Reserve
        </button>
      </div>
    );
  };

  useEffect(() => {
    fetch(`http://localhost:5177/GetHotel/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch hotel");
        }
        return response.json();
      })
      .then((data) => setHotel(data))
      .catch((error) => console.error("Error fetching hotel:", error));
  }, [id]);

  useEffect(() => {
    if (hotel) {
      const query = new URLSearchParams({
        roomType: selectedRoomType,
        breakfastIncluded: breakfastIncluded.toString(),
        numberOfPersons: numberOfPersons.toString(),
        startDate: startDate ? startDate.toISOString() : "",
        endDate: endDate ? endDate.toISOString() : "",
      });

      fetch(`http://localhost:5177/GetHotelPrice?${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch hotel price");
          }
          return response.json();
        })
        .then((data) => {
          setPrice(data);
        })
        .catch((error) =>
          console.error("Error fetching price of the hotel:", error),
        );
    }
  }, [
    breakfastIncluded,
    selectedRoomType,
    hotel,
    numberOfPersons,
    startDate,
    endDate,
  ]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  if (!hotel) {
    return <div>Hmm... Hotel {id} seems not to be found </div>;
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg text-center justify-center flex flex-col items-center">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{hotel.name}</h2>
            <p className="text-gray-600 mb-4">{hotel.address}</p>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Room Types</h3>
              <label className="block mb-2">
                <input
                  type="radio"
                  value="Standard"
                  checked={selectedRoomType === "Standard"}
                  onChange={() => setSelectedRoomType("Standard")}
                />
                <span className="ml-2">Standard - 100€/night</span>
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  value="Deluxe"
                  checked={selectedRoomType === "Deluxe"}
                  onChange={() => setSelectedRoomType("Deluxe")}
                />
                <span className="ml-2">Deluxe - 150€/night</span>
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  value="Suite"
                  checked={selectedRoomType === "Suite"}
                  onChange={() => setSelectedRoomType("Suite")}
                />
                <span className="ml-2">Suite - 200€/night</span>
              </label>
            </div>
            <div className="flex items-center justify-center mb-6 mt-6">
              <label className="block">
                <div className="font-bold text-xl">Number of Persons</div>
                <input
                  type="number"
                  value={numberOfPersons}
                  onChange={(e) => setNumberOfPersons(Number(e.target.value))}
                  className="ml-2 border border-gray-300 px-2 py-1 rounded-md"
                  min="1"
                />
              </label>
            </div>
            <div className="mb-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Select Dates</h3>
              <DatePicker
                selected={startDate}
                onChange={(dates) =>
                  handleDateChange(dates as [Date | null, Date | null])
                }
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
              <p className="text-gray-600 mt-2">
                {startDate && endDate ? `` : "Please select dates"}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Options</h3>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={breakfastIncluded}
                  onChange={() => setBreakfastIncluded(!breakfastIncluded)}
                />
                <span className="ml-2">Include Breakfast</span>
              </label>
              <span className="block mt-1 text-gray-500">
                15€ per person per day
              </span>
            </div>
            <PriceBox price={price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
