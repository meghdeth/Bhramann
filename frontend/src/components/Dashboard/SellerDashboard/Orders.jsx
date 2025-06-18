/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiEdit, FiFile, FiX } from "react-icons/fi";
import { Clock, DollarSign, MapPin, Star, Users, X } from "lucide-react";

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
  scrollbar-width: thin;
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: fixed;
  }
`;

const packages = [
  {
    id: 1,
    name: "Royal Rajasthan Tour",
    description: "Explore the grandeur of Rajasthan with its palaces, forts, and desert landscapes.",
    location: "Rajasthan, India",
    priceType: 'variable',
    priceRanges: [
      { from: 1, to: 5, price: 8000 },
      { from: 6, to: 10, price: 7500 }
    ],
    dateType: 'range',
    availableDates: { start: '2023-12-01', end: '2023-12-31' },
    quantity: '20',
    mainPhotos: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41"
    ],
    itinerary: [
      {
        id: 1,
        title: 'Arrival Day',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner']
      },
      {
        id: 2,
        title: 'Day 2: Jaipur Exploration',
        activities: ['Visit Amer Fort', 'Explore City Palace', 'Shop at local markets']
      }
    ],
    inclusions: {
      accommodation: true,
      meals: true,
      transport: true,
      guide: true,
      trainFlight: false
    },
    inclusionDetails: ['All meals included', 'Professional guide'],
    highlights: [
      "Jaipur - Amer Fort & City Palace",
      "Jaisalmer - Thar Desert Safari",
      "Udaipur - Lake Pichola & City Palace"
    ],
    stays: [
      {
        hotel: "Taj Lake Palace, Udaipur",
        roomType: "Deluxe Room",
        amenities: ["Free Wi-Fi", "Hot Shower", "Mountain View"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
      },
      {
        hotel: "Umaid Bhawan Palace, Jodhpur",
        roomType: "Luxury Suite",
        amenities: ["Swimming Pool", "Spa", "Private Balcony"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
      }
    ],
    rating: 4.8,
    bookings: 312,
    status: "active"
  },
  {
    id: 2,
    name: "Kerala Backwaters Retreat",
    description: "Enjoy the tranquil beauty of Kerala’s backwaters, hill stations, and beaches.",
    location: "Kerala, India",
    priceType: 'fixed',
    price: 12000,
    dateType: 'range',
    availableDates: { start: '2023-12-01', end: '2023-12-31' },
    quantity: '15',
    mainPhotos: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944"
    ],
    itinerary: [
      {
        id: 1,
        title: 'Arrival Day',
        activities: ['Airport pickup', 'Houseboat check-in', 'Welcome dinner']
      },
      {
        id: 2,
        title: 'Day 2: Alleppey Houseboat',
        activities: ['Backwater cruise', 'Village visit', 'Local cuisine tasting']
      }
    ],
    inclusions: {
      accommodation: true,
      meals: true,
      transport: true,
      guide: true,
      trainFlight: false
    },
    inclusionDetails: ['All meals included', 'Professional guide'],
    highlights: [
      "Alleppey Houseboat Stay",
      "Munnar Tea Plantations",
      "Kochi Fort & Chinese Fishing Nets"
    ],
    stays: [
      {
        hotel: "Kumarakom Lake Resort",
        roomType: "Deluxe Room",
        amenities: ["Free Wi-Fi", "Hot Shower", "Lake View"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
      },
      {
        hotel: "The Leela Kovalam",
        roomType: "Beachfront Villa",
        amenities: ["Private Beach", "Spa", "Infinity Pool"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
      }
    ],
    rating: 4.9,
    bookings: 278,
    status: "active"
  },
  {
    id: 3,
    name: "Himalayan Adventure in Himachal",
    description: "Experience the snow-capped peaks, adventure sports, and scenic valleys of Himachal.",
    location: "Himachal Pradesh, India",
    priceType: 'variable',
    priceRanges: [
      { from: 6, to: 10, price: 7500 }
    ],
    dateType: 'range',
    availableDates: { start: '2023-12-01', end: '2023-12-31' },
    quantity: '20',
    mainPhotos: [
      "https://images.unsplash.com/photo-1599751229070-854ae5c90869",
      "https://images.unsplash.com/photo-1599751229070-854ae5c90869"
    ],
    itinerary: [
      {
        id: 1,
        title: 'Arrival Day',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner']
      },
      {
        id: 2,
        title: 'Day 2: Shimla Exploration',
        activities: ['Visit Mall Road', 'Explore Kufri', 'Local sightseeing']
      }
    ],
    inclusions: {
      accommodation: true,
      meals: true,
      transport: true,
      guide: true,
      trainFlight: false
    },
    inclusionDetails: ['All meals included', 'Professional guide'],
    highlights: [
      "Shimla - Mall Road & Kufri",
      "Manali - Rohtang Pass & Solang Valley",
      "Dharamshala - Dalai Lama Monastery"
    ],
    stays: [
      {
        hotel: "The Oberoi Cecil, Shimla",
        roomType: "Deluxe Room",
        amenities: ["Free Wi-Fi", "Hot Shower", "Mountain View"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
      },
      {
        hotel: "Manu Allaya Resort, Manali",
        roomType: "Luxury Suite",
        amenities: ["Swimming Pool", "Spa", "Private Balcony"],
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
      }
    ],
    rating: 4.7,
    bookings: 5,
    status: "active"
  },
];

function MyPackages() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowDetails(true);
  };

  return (
    <Container>
      <MainContent showDetails={showDetails}>
      <div className="flex justify-between m-4 flex-col md:flex-row md:items-center md:gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-4">
              Bookings
            </h1>
            <p className="text-gray-600">
              Manage and monitor your travel bookings
            </p>
          </div>
        </div>
        <div className={`grid gap-6 grid-cols-1 ${showDetails ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-2xl overflow-hidden transition-all duration-500"
            >
              <div className="relative w-full h-[300px] object-cover" style={{
                background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6) ), url(${pkg.mainPhotos[0]}) no-repeat center center/cover`,
              }}>
                <div className='absolute bottom-0 left-5 text-gray-200'>
                  <h3 className="text-2xl font-bold  m-2">
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
                      <DollarSign className="size-5" />
                      <span>
                        {pkg.priceType === 'fixed'
                          ? `${pkg.price} per person`
                          : `${pkg.priceRanges[0].price} per person (${pkg.priceRanges[0].from}-${pkg.priceRanges[0].to})`
                        }
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

              <div className="p-6">
                <div className="space-y-3">
                  <div className='flex gap-3'>
                    <button
                      onClick={() => handleViewDetails(pkg)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-500 !text-white py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300"
                    >
                      View Details
                    </button>

                    <button
                      className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-50 transition-all duration-300"
                    >
                      Deny Package
                    </button>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-2 border border-green-500 text-green-500 py-2.5 rounded-xl font-medium hover:bg-green-50 transition-all duration-300"
                  >
                    Approve Package
                  </button>
                </div>
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
            <div className="relative">
              <img
                src={selectedPackage.mainPhotos[0]}
                alt={selectedPackage.name}
                className="w-full h-64 object-cover" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedPackage.name}
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedPackage.status === 'active'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
                  }`}>
                  {selectedPackage.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                {selectedPackage.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Clock className="size-5" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold">{selectedPackage.itinerary.length} Days</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users className="size-5" />
                    <span className="text-sm">Bookings</span>
                  </div>
                  <p className="font-semibold">{selectedPackage.bookings}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Star className="size-5" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <p className="font-semibold">{selectedPackage.rating}/5</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                  <div className="space-y-2">
                    {selectedPackage.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-600">
                        <MapPin className="size-5 text-blue-500" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Accommodations</h3>
                  <div className="space-y-2">
                    {selectedPackage.stays.map((stay, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <MapPin className="size-5 text-blue-500" />
                        <span>{stay.hotel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DetailsPanel>)}
    </Container>
  );
}

export default MyPackages;
