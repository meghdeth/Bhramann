import { useLocation } from "react-router-dom";

export default function BusesSearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  return (
    <div style={{ padding: 32 }}>
      <h2>Bus Search Results</h2>
      <div>From: {from}</div>
      <div>To: {to}</div>
      <div>Date: {date}</div>
      <div style={{ marginTop: 24 }}>
        {/* TODO: Fetch and display real results here */}
        <p>Results will appear here.</p>
      </div>
    </div>
  );
} 