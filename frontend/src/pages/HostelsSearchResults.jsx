import { useLocation } from "react-router-dom";

export default function HostelsSearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const destination = params.get("destination");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");

  return (
    <div style={{ padding: 32 }}>
      <h2>Hostel Search Results</h2>
      <div>Destination: {destination}</div>
      <div>Check-in: {checkIn}</div>
      <div>Check-out: {checkOut}</div>
      <div style={{ marginTop: 24 }}>
        {/* TODO: Fetch and display real results here */}
        <p>Results will appear here.</p>
      </div>
    </div>
  );
} 