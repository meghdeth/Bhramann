import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
  Hotel,
  Car,
  Utensils,
  Camera,
  Mountain,
  Info,
  Star,
  DollarSign,
  Users,
  ChevronLeft,
  Plus,
  Minus,
  X,
  Upload
} from 'lucide-react';
import api from '../api';

function PackageDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('photos');
  const [travelers, setTravelers] = useState(1);
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/packages/${id}`)
      .then(({ data }) => {
        setPackageDetails(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load package details');
        setLoading(false);
      });
  }, [id]);

  const tabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'itinerary', label: 'Detailed Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'hotels', label: 'Hotels' }
  ];

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getApplicablePrice = () => {
    if (!packageDetails || !packageDetails.priceRanges) return 0;
    for (const range of packageDetails.priceRanges) {
      if (travelers >= range.from && travelers <= range.to) {
        return range.price;
      }
    }
    return packageDetails.priceRanges?.[packageDetails.priceRanges.length - 1]?.price || 0;
  };

  const handleIncrease = () => setTravelers((prev) => prev + 1);
  const handleDecrease = () => {
    if (travelers > 1) setTravelers((prev) => prev - 1);
  };

  const applicablePrice = getApplicablePrice();
  const totalPrice = travelers * applicablePrice;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!packageDetails) return null;

  return (
    <div className="min-h-screen bg-gray-50 mt-35">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-lg">
            <Link to="/" className="text-blue-500 hover:!text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/tour-packages" className="text-blue-500 hover:!text-blue-600">
              Tour Packages
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{packageDetails?.name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex justify-between gap-8 flex-col md:flex-row">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {packageDetails?.name}
              </h1>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPin className="size-6 text-gray-400" />
                  <span className="text-gray-600 text-xl">{packageDetails?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-6 text-gray-400" />
                  <span className="text-gray-600 text-xl">Available: {packageDetails?.quantity} spots</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:gap-10 gap-2 mt-4 md:mt-0">
              <div className='flex justify-between items-center gap-20 px-5'>
              <div className='flex-1'>
                <div className="flex items-center gap-8">
                  <button
                  onClick={handleDecrease}
                  disabled={travelers <= 1}
                    className="w-12 h-12 flex items-center justify-center bg-blue-500 !text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-semibold text-gray-800">{travelers}</span>
                    <p className="text-gray-500">Travelers</p>
                  </div>
                  <button
                  onClick={handleIncrease}
                    className="w-12 h-12 flex items-center justify-center bg-blue-500 !text-white rounded-xl hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹{totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  (₹{applicablePrice.toLocaleString()} per person)
                </div>
              </div>
              </div>
              <button className="tertiary-btn bg-blue-500 hover:bg-blue-600 md:w-50">
                Book Now
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4">
              {packageDetails?.priceRanges.map((range, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    travelers >= range.from && travelers <= range.to 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span>{range.from} - {range.to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">₹{range.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">/ person</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-evenly gap-8 mt-8 border-b border-gray-200 overflow-x-auto pb-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 !font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <div className="flex gap-8 md:flex-col">
          {/* Left Content */}
          <div className="flex-[2] space-y-8">
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 gap-4">
                {packageDetails?.mainPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Tour ${index + 1}`}
                    className="w-full h-[300px] object-cover rounded-xl"
                  />
                ))}
              </div>
            )}

            {activeTab === 'highlights' && (
              <div className="space-y-6">
                {packageDetails?.highlights.map((highlight) => (
                  <div key={highlight.id} className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-2xl font-semibold mb-6">{highlight.title}</h3>
                    <div>
                      <img src={highlight.image} alt={highlight.title} className="w-full h-[300px] object-cover rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                {packageDetails?.itinerary.map((day) => (
                  <div key={day.id} className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">Day {day.id}: {day.title}</h3>
                        <div className="space-y-3">
                          {day.activities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 text-gray-600">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span>{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div className="space-y-6">
                {packageDetails?.inclusions.map((inclusion) => (
                  <div key={inclusion.id} className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-2xl font-semibold mb-6">{inclusion.title}</h3>
                    <div className="grid gap-4">
                      {inclusion.details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-8">
                {packageDetails?.stays.map((stay) => (
                  <div key={stay.id} className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4">{stay.hotel}</h3>
                    <p className="text-gray-600 mb-6">{stay.description}</p>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {stay.images.map((image, index) => (
                        <div key={index} className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={image}
                            alt={`${stay.hotel} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-2xl font-medium text-gray-600">Room Type</span>
                        <p className="text-lg text-gray-800">{stay.roomType}</p>
                      </div>
                      <div>
                        <span className="text-2xl font-medium text-gray-600">Amenities</span>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {stay.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600 text-xl">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;