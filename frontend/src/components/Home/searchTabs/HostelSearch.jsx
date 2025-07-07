import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/CustomDatePicker.css";

export default function HostelSearch({ values, setValues }) {
  const { destination, checkIn, checkOut } = values;

  return (
    <>
      <input
        placeholder="Where would you like to stay?"
        value={destination}
        onChange={(e) => setValues({ ...values, destination: e.target.value })}
        className="input-base mb-4"
      />
      <div className="flex gap-4 mb-4">
        <DatePicker
          selected={checkIn}
          onChange={(date) => {
            setValues({ ...values, checkIn: date, checkOut: date > checkOut ? null : checkOut });
          }}
          placeholderText="Check-in Date"
          className="input-base"
          minDate={new Date()}
        />
        <DatePicker
          selected={checkOut}
          onChange={(date) => setValues({ ...values, checkOut: date })}
          placeholderText="Check-out Date"
          className="input-base"
          minDate={checkIn || new Date()}
        />
      </div>
    </>
  );
}
