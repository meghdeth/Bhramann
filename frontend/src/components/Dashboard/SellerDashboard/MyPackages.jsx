// src/pages/MyPackages.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Clock,
  IndianRupee,
  MapPin,
  Star,
  Users,
  X
} from "lucide-react";
import api from '../../../api';  

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  flex: ${(props) => (props.showDetails ? "0 0 66%" : "1")};
  transition: flex 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    flex: 1;
    padding: 0 15px;
  }
`;

const DetailsPanel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 33%;
  background-color: #f9f9f9;
  box-shadow: -2px 0px 4px 0px #00000040;
  border-left: 1px solid #ddd;
  padding: 15px;
  transform: ${(props) =>
    props.showDetails ? "translateX(0)" : "translateX(100%)"};
  transition: transform 1s ease-in-out;
  z-index: 999;
  display: ${(props) => (props.showDetails ? "block" : "none")};
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: fixed;
  }
`;

export default function MyPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Fetch packages on mount
  useEffect(() => {
    api.get("/api/packages")
      .then(({ data }) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load packages:", err);
        if (err.response?.status === 401) {
          setError("Please log in to view your packages.");
        } else {
          setError("Could not load packages. Please try again later.");
        }
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowDetails(true);
  };

  const handleDelete = (pkgId) => {
    if (!window.confirm("Delete this package?")) return;
    api.delete(`/api/packages/${pkgId}`)
      .then(() => {
        setPackages(pkgs => pkgs.filter(p => p._id !== pkgId));
      })
      .catch(err => {
        console.error("Delete failed:", err);
        const errorMessage = err.response?.data?.message || "Failed to delete package. Please try again.";
        alert(errorMessage);
      });
  };

  if (loading) return <p className="p-4">Loading packages…</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Container>
      <MainContent showDetails={showDetails}>
        <div className="flex justify-between m-4 flex-col md:flex-row md:items-center md:gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-4">
              My Packages
            </h1>
            <p className="text-gray-600">
              Manage and monitor your travel packages
            </p>
          </div>
          <Link
            to="/seller-dashboard/packages/add-package"
            className="primary-btn text-center"
          >
            Add New Package
          </Link>
        </div>

        <div className={`grid gap-6 grid-cols-1 ${showDetails ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-gray-50 hover:bg-gray-100 rounded-2xl overflow-hidden transition-all duration-500"
            >
              <div
                className="relative w-full h-[300px] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.6)), url(${pkg.mainPhotos[0]})`
                }}
              >
                <div className="absolute bottom-0 left-5 text-gray-200">
                  <h3 className="text-2xl font-bold m-2">
                    {pkg.name}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="size-5" />
                      <span>{pkg.itinerary.length} Days</span>
                    </div>
                    <div className="flex items-center gap-2 ">
                      <Users className="size-5" />
                      <span>{pkg.bookings} bookings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="size-5" />
                      <span>
                        {pkg.priceType === "fixed"
                          ? `${pkg.priceRanges[0].price} per person`
                          : `${pkg.priceRanges[0].price} per person (${pkg.priceRanges[0].from}-${pkg.priceRanges[0].to})`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 px-4 py-1 rounded-full text-lg font-medium bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-5 text-yellow-400 fill-current" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewDetails(pkg)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 !text-white py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300"
                  >
                    View Details
                  </button>

                  <Link
                    to={`/seller-dashboard/packages/modify-package/${pkg._id}`}
                    className="w-full flex items-center justify-center gap-2 border border-blue-500 hover:!text-blue-500 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300"
                  >
                    Edit Package
                  </Link>
                </div>

                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="w-full flex items-center justify-center gap-2 border border-red-500 hover:!text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-50 transition-all duration-300"
                >
                  Delete Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </MainContent>

      {showDetails && selectedPackage && (
        <DetailsPanel showDetails={showDetails}>
          <button
            onClick={() => setShowDetails(false)}
            className="py-2 px-4 mb-2 rounded-lg hover:bg-gray-100"
          >
            <X className="size-8" />
          </button>
          <div className="bg-white rounded-2xl overflow-y-auto">
            <img
              src={selectedPackage.mainPhotos[0]}
              alt={selectedPackage.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedPackage.name}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xl font-medium ${
                    selectedPackage.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {selectedPackage.status === "active" ? "Approved" : "Pending Approval"}
                </span>
              </div>
              <p className="text-gray-600">
                {selectedPackage.description}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <PanelCard icon={<Clock />} label="Duration" value={`${selectedPackage.itinerary.length} Days`} />
                <PanelCard icon={<Users />} label="Bookings" value={selectedPackage.bookings} />
                <PanelCard icon={<Star />} label="Rating" value={`${selectedPackage.rating}/5`} />
              </div>

              <Section title="Highlights" icon={<MapPin />}>
                {selectedPackage.highlights.map((h, i) => (
                  <li key={i}>{h.title}</li>
                ))}
              </Section>

              <Section title="Accommodations" icon={<MapPin />}>
                {selectedPackage.stays.map((s, i) => (
                  <li key={i}>{s.hotel}</li>
                ))}
              </Section>
            </div>
          </div>
        </DetailsPanel>
      )}
    </Container>
  );
}

function PanelCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-1">
      <div className="flex items-center gap-2 text-gray-600">{icon}<span className="text-sm">{label}</span></div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">{icon}<span>{title}</span></h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {children}
      </ul>
    </div>
  );
}
