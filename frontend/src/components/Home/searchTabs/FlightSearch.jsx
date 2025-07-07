import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/CustomDatePicker.css";
import { ArrowRightLeft } from 'lucide-react'

export default function FlightSearch({ values, setValues }) {
    const { from, to, depart, returnDate, passengers, tripType } = values;

    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                <span>Trip type</span>

                <label
                    className={`cursor-pointer px-4 py-2 rounded-full border transition 
    ${tripType === "one-way"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    <input
                        type="radio"
                        name="tripType"
                        value="one-way"
                        checked={tripType === "one-way"}
                        onChange={() => setValues({ ...values, tripType: "one-way" })}
                        className="hidden"
                    />
                    One-way
                </label>

                <label
                    className={`cursor-pointer px-4 py-2 rounded-full border transition 
    ${tripType === "round-trip"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    <input
                        type="radio"
                        name="tripType"
                        value="round-trip"
                        checked={tripType === "round-trip"}
                        onChange={() => setValues({ ...values, tripType: "round-trip" })}
                        className="hidden"
                    />
                    Round-trip
                </label>
            </div>


            <div className="flex gap-4 mb-4 items-center">
                <input
                    placeholder="From"
                    value={from}
                    onChange={(e) => setValues({ ...values, from: e.target.value })}
                    className="input-base"
                />
                <ArrowRightLeft
                    className="size-10 cursor-pointer"
                    onClick={() =>
                        setValues({
                            ...values,
                            from: to,
                            to: from,
                        })
                    }
                />
                <input
                    placeholder="To"
                    value={to}
                    onChange={(e) => setValues({ ...values, to: e.target.value })}
                    className="input-base"
                />
            </div>

            <div className="flex gap-4 mb-4">
                <DatePicker
                    selected={depart}
                    onChange={(date) => setValues({ ...values, depart: date })}
                    placeholderText="Departure"
                    className="input-base"
                    minDate={new Date()}
                />
                {tripType === "round-trip" && (
                    <DatePicker
                        selected={returnDate}
                        onChange={(date) => setValues({ ...values, returnDate: date })}
                        placeholderText="Return"
                        className="input-base"
                        minDate={depart || new Date()}
                    />
                )}
            </div>

            <div className="flex gap-5 items-center">
                <p>Travellers</p>
                <input
                    type="number"
                    min={1}
                    value={passengers}
                    onChange={(e) => setValues({ ...values, passengers: e.target.value })}
                    className="input-base w-32"
                    placeholder="Passengers"
                />
            </div>
        </>
    );
}
