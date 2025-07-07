import DatePicker from "react-datepicker";

export default function BusSearchFields({ values, setValues }) {
  const { from, to, date } = values;

  return (
    <>
      <div className="flex gap-4 mb-4">
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setValues({ ...values, from: e.target.value })}
          className="input-base"
        />
        <input
          placeholder="To"
          value={to}
          onChange={(e) => setValues({ ...values, to: e.target.value })}
          className="input-base"
        />
      </div>

      <DatePicker
        selected={date}
        onChange={(date) => setValues({ ...values, date })}
        placeholderText="Travel date"
        className="input-base"
        minDate={new Date()}
      />
    </>
  );
}
