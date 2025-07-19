import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Sliders } from 'lucide-react';
import Packages from "../components/TourPackages/Packages";
import SearchBox from "../components/Home/SearchBox";
import Filters from "../components/TourPackages/Filters";

function TourPackages() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    duration: [],
    rating: 0,
    categories: [],
    amenities: []
  });

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[1400px] mx-auto px-8 py-6 md:px-5">
        <SearchBox from={from} to={to} date={date} />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-4">
        <div className="flex md:gap-12">
          {/* Filters */}
          <div className="flex-1">
            <Filters
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Packages */}
          <div className="md:flex-[3] mt-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 md:text-3xl">
                Available Packages
              </h1>
              <div className="flex md:items-center items-start justify-between md:flex-row flex-col">
                <p className="text-gray-600">
                  Showing packages matching your criteria
                </p>
                <div className='flex items-center justify-between md:w-auto w-full mt-5'>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="recommended">Sort by: Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden flex items-center gap-2 px-6 py-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <Sliders className="size-5" />
                    Filters
                  </button>

                </div>

              </div>
            </div>

            <div className="space-y-8">
              <Packages filters={filters} sortBy={sortBy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPackages;