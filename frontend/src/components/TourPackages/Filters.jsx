import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';

function Filters({ showFilters, setShowFilters, filters, onFilterChange }) {
  const [tempFilters, setTempFilters] = useState(filters);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const categories = [
    "Adventure",
    "Beach",
    "Cultural",
    "Mountain",
    "City Break",
    "Wildlife"
  ];

  const amenities = [
    "Wi-Fi",
    "Pool",
    "Spa",
    "Restaurant",
    "Fitness Center",
    "Airport Transfer"
  ];

  const durations = [
    "1-3 Days",
    "4-7 Days",
    "8-14 Days",
    "15+ Days"
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...tempFilters,
      [category]: value
    };
    setTempFilters(newFilters);
    
    // On desktop, apply filters immediately
    if (!isMobile) {
      onFilterChange(newFilters);
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setShowFilters(false);
  };

  const handleBackButton = () => {
    setTempFilters(filters);
    setShowFilters(false);
  };

  return (
    <div className={`md:sticky fixed inset-0 md:top-32 top-0 md:rounded-2xl shadow-lg md:p-6 p-10 z-[9999] md:z-50 bg-white md:size-auto size-full flex flex-col justify-between
      ${showFilters ? 'translate-x-0' : '-translate-x-full'}
      transition-transform duration-300 md:translate-x-0
    `}>
      <div>
        <div className="flex items-center mb-8 gap-5">
          <button
            onClick={handleBackButton}
            className="md:hidden block"
          >
            <ArrowLeft className="size-8" />
          </button>
          <h2 className="text-3xl font-bold text-gray-800">Filters</h2>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="5000"
              value={tempFilters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-gray-600 text-xl">
              <span>$0</span>
              <span>Up to ${tempFilters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center gap-2 text-xl">
                <input
                  type="checkbox"
                  checked={tempFilters.duration.includes(duration)}
                  onChange={(e) => {
                    const newDurations = e.target.checked
                      ? [...tempFilters.duration, duration]
                      : tempFilters.duration.filter(d => d !== duration);
                    handleFilterChange('duration', newDurations);
                  }}
                  className="size-6 rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-600">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Rating</h3>
          <div className="flex items-center gap-4 text-xl">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleFilterChange('rating', rating === tempFilters.rating ? 0 : rating)}
                className={`w-20 h-12 rounded-full flex items-center justify-center ${tempFilters.rating === rating
                  ? 'bg-blue-500 !text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2 text-xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  const newCategories = tempFilters.categories.includes(category)
                    ? tempFilters.categories.filter(c => c !== category)
                    : [...tempFilters.categories, category];
                  handleFilterChange('categories', newCategories);
                }}
                className={`px-4 py-2 rounded-full text-sm ${tempFilters.categories.includes(category)
                  ? 'bg-blue-500 !text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-3 text-xl">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tempFilters.amenities.includes(amenity)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...tempFilters.amenities, amenity]
                      : tempFilters.amenities.filter(a => a !== amenity);
                    handleFilterChange('amenities', newAmenities);
                  }}
                  className="size-6 rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-600">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col gap-3">
        {/* Only show Apply button on mobile */}
        {isMobile && (
          <button
            onClick={handleApplyFilters}
            className="w-full py-3 bg-blue-500 !text-white font-medium rounded-xl hover:bg-blue-600 transition-colors duration-200"
          >
            Apply Filters
          </button>
        )}

        <button
          onClick={() => {
            const clearedFilters = {
              priceRange: [0, 5000],
              duration: [],
              rating: 0,
              categories: [],
              amenities: []
            };
            setTempFilters(clearedFilters);
            // Apply immediately on desktop, wait for Apply click on mobile
            if (!isMobile) {
              onFilterChange(clearedFilters);
            }
          }}
          className="w-full py-3 text-blue-500 font-medium border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-colors duration-200"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;