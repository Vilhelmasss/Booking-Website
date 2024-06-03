import "./App.css";
import "./index.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookingList from "./pages/BookingList";
import HotelDetails from "./pages/HotelDetails";

function App() {
  return (
    <div className="App">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            background: "green",
            fontSize: "20px",
          }}
        >
          <Link to="/home" style={{ color: "white" }}>
            Home
          </Link>
          <Link to="/booking-list" style={{ color: "white" }}>
            Booking List
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking-list" element={<BookingList />} />
        <Route path="/hotel-details/:id" element={<HotelDetails />} />
      </Routes>
    </div>
  );
}

export default App;
