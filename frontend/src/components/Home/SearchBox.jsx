import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Calendar, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/CustomDatePicker.css";


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 3rem 4rem;
  border-radius: 20px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    width: 95%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    padding: 0.2rem 0;
  }
`;


function SearchBox({ destination = "", date = "" }) {
  const [searchDestination, setSearchDestination] = useState(destination);
  const [searchDate, setSearchDate] = useState(date);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchDestination.trim()) {
      alert("Please enter a destination.");
      return;
    }

    const queryParams = new URLSearchParams({
      destination: searchDestination,
      date: searchDate ? new Date(searchDate).toISOString().split("T")[0] : "",
    }).toString();

    navigate(`/tour-packages?${queryParams}`);
  };

  return (
    <SearchContainer>
      <InputContainer className="flex-1">
        <div className="flex-1 relative group mr-5">
        <div className="input-icon">
          <MapPin className="text-blue-600/70 size-6" />
        </div>
        <input
          type="text"
          placeholder="Where would you like to travel?"
          value={searchDestination}
          onChange={(e) => setSearchDestination(e.target.value)}
          className="input-base pl-12 mr-20"
        />
        </div>
      </InputContainer>

        <InputContainer>
        <div className="flex-1 relative group mr-5">
        <div className="input-icon">
            <Calendar className="text-blue-600/70 size-6" />
          </div>
          <DatePicker
            selected={searchDate ? new Date(searchDate) : null}
            onChange={(date) => setSearchDate(date)}
            placeholderText="When?"
            dateFormat="dd MMM yyyy"
            minDate={new Date()}
            showPopperArrow={false}
            onFocus={(e) => e.target.blur()}
            className="input-base pl-12"
          />
        </div>
        </InputContainer>

      <button onClick={handleSearch} className="primary-btn">
        Search
      </button>
    </SearchContainer>
  );
}

export default SearchBox;
