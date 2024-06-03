import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hotel } from "../types/Hotel";

const Home = () => {
  const [responseData, setResponseData] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch("http://localhost:5177/GetHotelList")
      .then((response) => response.json())
      .then((data) => setResponseData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl font-bold mt-8 mb-6">
        Hotel Listings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {responseData.map((hotel, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              className="w-full h-48 object-cover"
              src={hotel.image}
              alt={hotel.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{hotel.name}</div>
              <p className="text-gray-700 text-base mb-12">{hotel.address}</p>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
                <Link to={{ pathname: `/hotel-details/${hotel.id}` }}>
                  <button className="text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
