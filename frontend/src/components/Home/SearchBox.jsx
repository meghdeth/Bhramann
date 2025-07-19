import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Plane, Hotel, Bus, Package } from "lucide-react";

import FlightSearch from "./searchTabs/FlightSearch";
import HostelSearch from "./searchTabs/HostelSearch";
import BusSearch from "./searchTabs/BusSearch";
import PackageSearch from "./searchTabs/PackageSearch";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 0 12px 12px;
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

  const [packageValues, setPackageValues] = useState({
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
      case "Packages":
        return <PackageSearch values={packageValues} setValues={setPackageValues} />;
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
      const { destination, checkIn, checkOut } = hostelValues;
      if (!destination || !checkIn || !checkOut) return alert("Please complete all fields.");
      navigate(`/hostels/search?destination=${destination}&checkIn=${checkIn.toISOString().split("T")[0]}&checkOut=${checkOut.toISOString().split("T")[0]}`);
    }

    if (activeTab === "Buses") {
      const { from, to, date } = busValues;
      if (!from || !to || !date) return alert("Please complete all fields.");
      navigate(
        `/buses/search?from=${from}&to=${to}&date=${date.toISOString().split("T")[0]}`
      );
    }

    if (activeTab === "Packages") {
      const { from, to, date } = packageValues;
      if (!from || !to || !date) return alert("Please complete all fields.");
      navigate(
        `/tour-packages/search?from=${from}&to=${to}&date=${date.toISOString().split("T")[0]}`
      );
    }
  };

  return (
    <SearchContainer className={`${activeTab === 'Flights' ? "bottom-18 md:bottom-0" : ''}`}>
      {/* Tabs */}
      <div className="absolute -top-16 left-0 flex bg-black text-white rounded-t-xl overflow-hidden">
        {["Flights", "Hostels", "Buses", "Packages"].map((tab) => {
          const Icon = tab === "Flights" ? Plane : tab === "Hostels" ? Hotel : tab === "Packages" ? Package : Bus;

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
        <button type="submit" onClick={handleSearch} className="primary-btn mt-4">
          Search
        </button>
      </div>
    </SearchContainer>
  );
}
