import React, { useMemo } from 'react';
import { Star, Heart, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 1,
    name: 'Bali Paradise Package',
    duration: '7 Days - 6 Nights',
    durationCategory: '4-7 Days',
    location: 'Bali, Indonesia',
    category: 'Beach',
    ratings: 4.8,
    reviews: 1250,
    price: 899,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant'],
    description: 'Experience the beauty of Bali with our most popular package. Includes luxury accommodations, cultural tours, and beach activities.'
  },
  {
    id: 2,
    name: 'Swiss Alps Adventure',
    duration: '5 Days - 4 Nights',
    durationCategory: '4-7 Days',
    location: 'Switzerland',
    category: 'Mountain',
    ratings: 4.9,
    reviews: 850,
    price: 1299,
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
    amenities: ['Wi-Fi', 'Restaurant', 'Airport Transfer'],
    description: 'Discover the majestic Swiss Alps with guided hiking tours, scenic train rides, and comfortable mountain lodges.'
  },
  {
    id: 3,
    name: 'Santorini Getaway',
    duration: '6 Days - 5 Nights',
    durationCategory: '4-7 Days',
    location: 'Greece',
    category: 'Cultural',
    ratings: 4.7,
    reviews: 920,
    price: 999,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Airport Transfer'],
    description: 'Experience the magic of Santorini with stunning caldera views, wine tasting, and traditional Greek experiences.'
  },
  {
    id: 4,
    name: 'Tokyo Explorer',
    duration: '2 Days - 1 Night',
    durationCategory: '1-3 Days',
    location: 'Japan',
    category: 'City Break',
    ratings: 4.6,
    reviews: 750,
    price: 499,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    amenities: ['Wi-Fi', 'Restaurant', 'Airport Transfer'],
    description: 'A quick urban adventure in the heart of Tokyo, perfect for those wanting to experience Japanese culture.'
  },
  {
    id: 5,
    name: 'Safari Adventure',
    duration: '10 Days - 9 Nights',
    durationCategory: '8-14 Days',
    location: 'Kenya',
    category: 'Wildlife',
    ratings: 4.9,
    reviews: 420,
    price: 2999,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
    amenities: ['Pool', 'Restaurant', 'Fitness Center', 'Airport Transfer'],
    description: 'An unforgettable wildlife experience in the African savanna with luxury lodge accommodations.'
  }
];

export default function Packages({ filters, sortBy }) {
  const filteredAndSortedPackages = useMemo(() => {
    let result = packages.filter(pkg => {
      const meetsPrice = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
      const meetsRating = filters.rating === 0 || pkg.ratings >= filters.rating;
      const meetsCategories = filters.categories.length === 0 || filters.categories.includes(pkg.category);
      const meetsDuration = filters.duration.length === 0 || filters.duration.includes(pkg.durationCategory);
      const meetsAmenities = filters.amenities.length === 0 || filters.amenities.every(amenity => pkg.amenities.includes(amenity));

      return meetsPrice && meetsRating && meetsCategories && meetsDuration && meetsAmenities;
    });

    switch (sortBy) {
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price);
      case 'rating-desc': return [...result].sort((a, b) => b.ratings - a.ratings);
      default: return result;
    }
  }, [filters, sortBy]);

  if (filteredAndSortedPackages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-semibold text-gray-800 mb-2">No packages found</p>
        <p className="text-gray-600">Try adjusting your filters to find more options</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {filteredAndSortedPackages.map((item) => (
        <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <img
              src={item.image}
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
                <span className="text-xl font-bold">{item.ratings}/5</span>
                <span className="text-xl text-black/70">({item.reviews})</span>
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

            <div className="flex flex-wrap gap-3 mb-8">
              {item.amenities.map((amenity, index) => (
                <span key={index} className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xl">
                  {amenity}
                </span>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5" />
                <span className="text-2xl">{item.duration}</span>
              </div>
              <p className="text-gray-600 text-lg mb-2">Price per Person</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-gray-800">${item.price}</span>
                <span className="text-gray-500">USD</span>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <Link to={`/tour-package/${item.id}`}
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