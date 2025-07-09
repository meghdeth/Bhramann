import { useLocation } from "react-router-dom";

export default function FlightsSearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const depart = params.get("depart");
  const passengers = params.get("passengers");
  const tripType = params.get("tripType");
  const returnDate = params.get("return");

  return (
    <div style={{ padding: 32 }}>
      <h2>Flight Search Results</h2>
      <div>From: {from}</div>
      <div>To: {to}</div>
      <div>Depart: {depart}</div>
      <div>Passengers: {passengers}</div>
      <div>Trip Type: {tripType}</div>
      {tripType === "round-trip" && returnDate && <div>Return: {returnDate}</div>}
      <div style={{ marginTop: 24 }}>
        {/* TODO: Fetch and display real results here */}
        <p>Results will appear here.</p>
      </div>
    </div>
  );
} 