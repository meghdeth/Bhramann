import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Plane, Hotel, Bus } from "lucide-react";

import FlightSearch from "./searchTabs/FlightSearch";
import HostelSearch from "./searchTabs/HostelSearch";
import BusSearch from "./searchTabs/BusSearch";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 3rem 4rem;
  border-radius: 0 20px 20px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
  width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    width: 95%;
    margin-bottom: 40px;
  }
`;

export default function SearchBox() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Flights");

  const [flightValues, setFlightValues] = useState({
    from: "",
    to: "",
    depart: null,
    returnDate: null,
    passengers: 1,
    tripType: "one-way",
  });

  const [hostelValues, setHostelValues] = useState({
    destination: "",
    checkIn: null,
    checkOut: null,
  });

  const [busValues, setBusValues] = useState({
    from: "",
    to: "",
    date: null,
  });

  const renderFields = () => {
    switch (activeTab) {
      case "Flights":
        return <FlightSearch values={flightValues} setValues={setFlightValues} />;
      case "Hostels":
        return <HostelSearch values={hostelValues} setValues={setHostelValues} />;
      case "Buses":
        return <BusSearch values={busValues} setValues={setBusValues} />;
      default:
        return null;
    }
  };

  const handleSearch = () => {
    if (activeTab === "Flights") {
      const { from, to, depart, returnDate, passengers, tripType } = flightValues;
      if (!from || !to || !depart) return alert("Please complete all fields.");

      const query = {
        from,
        to,
        depart: depart.toISOString().split("T")[0],
        passengers,
        tripType,
      };

      if (tripType === "round-trip" && returnDate) {
        query.return = returnDate.toISOString().split("T")[0];
      }

      navigate(`/flights/search?${new URLSearchParams(query).toString()}`);
    }

    if (activeTab === "Hostels") {
      const { destination, date } = hostelValues;
      if (!destination || !date) return alert("Please complete all fields.");
      navigate(`/hostels/search?destination=${destination}&date=${date.toISOString().split("T")[0]}`);
    }

    if (activeTab === "Buses") {
      const { from, to, date } = busValues;
      if (!from || !to || !date) return alert("Please complete all fields.");
      navigate(
        `/buses/search?from=${from}&to=${to}&date=${date.toISOString().split("T")[0]}`
      );
    }
  };

  return (
    <SearchContainer>
      {/* Tabs */}
      <div className="absolute -top-16 left-0 flex bg-black text-white rounded-t overflow-hidden">
        {["Flights", "Hostels", "Buses"].map((tab) => {
          const Icon = tab === "Flights" ? Plane : tab === "Hostels" ? Hotel : Bus;

          return (
            <div
              key={tab}
              className={`flex items-center gap-2 py-3 px-5 cursor-pointer transition ${activeTab === tab
                  ? "bg-white text-black"
                  : "hover:bg-white/80 hover:text-black"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              <Icon className="size-7" />
              {tab}
            </div>
          );
        })}
      </div>


      <div className="flex flex-col w-full gap-4">
        {renderFields()}
        <button onClick={handleSearch} className="primary-btn mt-4">
          Search
        </button>
      </div>
    </SearchContainer>
  );
}
