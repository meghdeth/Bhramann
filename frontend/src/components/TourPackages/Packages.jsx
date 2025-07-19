import React, { useEffect, useState } from 'react';
import { Star, Heart, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Packages({ filters, sortBy }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filters.priceRange) {
          params.minPrice = filters.priceRange[0];
          params.maxPrice = filters.priceRange[1];
        }
        if (filters.categories && filters.categories.length > 0) {
          params.category = filters.categories[0];
        }
        if (filters.destination && filters.destination.length > 0) {
          params.destination = filters.location[0];
        }
        if (filters.location) {
          params.location = filters.location;
        }
        // Do not send rating, duration, amenities, or sortBy

        const res = await api.get('/api/packages', { params });
        setPackages(res.data.packages || res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [filters, sortBy]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-semibold text-gray-800 mb-2">Loading packages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-semibold text-red-600 mb-2">{error}</p>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-semibold text-gray-800 mb-2">No packages found</p>
        <p className="text-gray-600">Try adjusting your filters to find more options</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {packages.map((item) => (
        <div key={item._id || item.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <img
              src={item.mainPhotos && item.mainPhotos[0]}
              alt={item.name}
              className="w-full h-[25rem] object-cover"
              loading="lazy"
            />
            <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20">
              <Heart className="size-6 text-gray-600" />
            </button>
            <button className="absolute bottom-4 right-4 px-6 py-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20">
              <div className="flex items-center gap-2">
                <Star className="size-6 text-yellow-400 fill-current" />
                <span className="text-xl font-bold">{item.rating || 0}/5</span>
                <span className="text-xl text-black/70">{item.bookings ? `(${item.bookings} bookings)` : ''}</span>
              </div>
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-3xl font-bold text-white">{item.name}</h3>
              <div className="flex items-center gap-2 text-gray-300 my-1">
                <MapPin className="size-5" />
                <span className="text-2xl">{item.location}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-600 mb-6 text-2xl">{item.description}</p>

            {/* Price display */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Users className="size-5" />
                <span className="text-2xl">{item.priceType === 'fixed' ? 'Fixed Price' : 'Variable Price'}</span>
              </div>
              {item.priceType === 'fixed' && item.priceRanges && item.priceRanges[0] && (
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-gray-800">₹{item.priceRanges[0].price}</span>
                </div>
              )}
              {item.priceType === 'variable' && item.priceRanges && item.priceRanges.length > 0 && (
                <div className="grid grid-cols-5 gap-1">
                  {item.priceRanges.map((range, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg border-blue-500 bg-blue-50">
                      <span className="text-lg">{range.from} - {range.to} people:</span>
                      <span className="text-2xl font-bold text-gray-800">₹{range.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Dates */}
            {(item.availableDates?.start || item.specificDates?.length > 0) && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="size-5" />
                  <span className="text-xl font-semibold">Available Dates:</span>
                </div>
                {item.availableDates?.start && item.availableDates?.end && (
                  <div className="text-lg text-gray-700 ml-7">
                    {new Date(item.availableDates.start).toLocaleDateString()} - {new Date(item.availableDates.end).toLocaleDateString()}
                  </div>
                )}
                {item.specificDates && item.specificDates.length > 0 && (
                  <div className="text-lg text-gray-700 ml-7">
                    {item.specificDates.map((d, i) => (
                      <span key={i}>{new Date(d).toLocaleDateString()}{i < item.specificDates.length - 1 ? ', ' : ''}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mb-6">
                <div className="text-xl font-semibold mb-2">Highlights:</div>
                <ul className="list-disc ml-7">
                  {item.highlights.map((hl) => (
                    <li key={hl.id} className="mb-1 flex items-center gap-2">
                      <span>{hl.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Inclusions */}
            {item.inclusions && item.inclusions.length > 0 && (
              <div className="mb-6">
                <div className="text-xl font-semibold mb-2">Inclusions:</div>
                <ul className="list-disc ml-7">
                  {item.inclusions.map((inc) => (
                    <li key={inc.id} className="mb-1">
                      <span className="font-bold">{inc.title}:</span> {inc.details && inc.details.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stays */}
            {item.stays && item.stays.length > 0 && (
              <div className="mb-6">
                <div className="text-xl font-semibold mb-2">Stays:</div>
                <ul className="list-disc ml-7">
                  {item.stays.map((stay) => (
                    <li key={stay.id} className="mb-1">
                      <span className="font-bold">{stay.hotel}</span> - {stay.roomType} {stay.amenities && `| Amenities: ${stay.amenities.join(', ')}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center gap-6">
              <Link to={`/tour-package/${item._id || item.id}`}
                className="w-full border-2 border-blue-500 !text-blue-500 hover:bg-blue-500/10 rounded-xl text-center py-2">
                View Details
              </Link>
              <button className="w-full bg-blue-500 hover:bg-blue-600 !text-white rounded-xl py-3">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}