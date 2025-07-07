import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Download,
  Calendar,
  Check,
  Clock,
  Award,
  MapPin,
  Plane,
  Home,
  Utensils,
  Bus
} from 'lucide-react';

export default function UserBookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');

  const allBookings = [
    {
      id: 1,
      packageName: 'Goa Beach Retreat',
      destination: 'Goa, India',
      date: '2024-11-15',
      endDate: '2024-11-20',
      status: 'confirmed',
      price: 3999,
      travelers: 3,
      image: 'https://images.unsplash.com/photo-1607619056577-7e289f82bba3',
      bookingDate: '2024-09-20',
      bookingReference: 'BMN2025001',
      inclusions: ['Hotels', 'Meals'],
      duration: '5 Days - 4 Nights',
      category: 'Beach'
    },
    {
      id: 2,
      packageName: 'Kashmir Winter Escape',
      destination: 'Srinagar, Kashmir',
      date: '2024-12-01',
      endDate: '2024-12-07',
      status: 'pending',
      price: 4999,
      travelers: 2,
      image: 'https://images.unsplash.com/photo-1577880216142-8549e9488dad',
      bookingDate: '2024-10-10',
      bookingReference: 'BMN2025002',
      inclusions: ['Hotels', 'Meals', 'Tours'],
      duration: '7 Days - 6 Nights',
      category: 'Mountain'
    },
    {
      id: 3,
      packageName: 'Darjeeling Tea Valley Tour',
      destination: 'Darjeeling, West Bengal',
      date: '2024-09-10',
      endDate: '2024-09-15',
      status: 'confirmed',
      price: 3500,
      travelers: 2,
      image: 'https://images.unsplash.com/photo-1603363409791-77b5030d1f5f',
      bookingDate: '2024-08-01',
      bookingReference: 'BMN2025003',
      inclusions: ['Hotels', 'Meals', 'Tours'],
      duration: '6 Days - 5 Nights',
      category: 'Hill Station'
    },
    {
      id: 4,
      packageName: 'Rajasthan Royal Heritage Tour',
      destination: 'Jaipur, Udaipur & Jodhpur',
      date: '2024-10-05',
      endDate: '2024-10-12',
      status: 'completed',
      price: 6999,
      travelers: 4,
      image: 'https://images.unsplash.com/photo-1600769053158-1b6368a5416e',
      bookingDate: '2024-08-15',
      bookingReference: 'BMN2025004',
      inclusions: ['Flights', 'Hotels', 'Tours', 'Meals'],
      duration: '8 Days - 7 Nights',
      category: 'Cultural'
    },
    {
      id: 5,
      packageName: 'Kerala Backwaters Experience',
      destination: 'Alleppey, Kerala',
      date: '2024-08-18',
      endDate: '2024-08-24',
      status: 'confirmed',
      price: 5999,
      travelers: 2,
      image: 'https://images.unsplash.com/photo-1559479083-041a855f4ed0',
      bookingDate: '2024-07-01',
      bookingReference: 'BMN2025005',
      inclusions: ['Houseboat', 'Meals', 'Transport'],
      duration: '7 Days - 6 Nights',
      category: 'Nature'
    },
    {
      id: 6,
      packageName: 'Leh-Ladakh Adventure',
      destination: 'Leh, Ladakh',
      date: '2024-07-20',
      endDate: '2024-07-27',
      status: 'pending',
      price: 8999,
      travelers: 1,
      image: 'https://images.unsplash.com/photo-1611605695395-2c587759ca48',
      bookingDate: '2024-06-10',
      bookingReference: 'BMN2025006',
      inclusions: ['Flights', 'Hotels', 'Transport'],
      duration: '8 Days - 7 Nights',
      category: 'Adventure'
    }
  ];


  const filteredBookings = useMemo(() => {
    return allBookings.filter((b) => {
      const searchMatch =
        b.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bookingReference.toLowerCase().includes(searchQuery.toLowerCase());

      const filterMatch = bookingFilter === 'all' || b.status === bookingFilter;

      return searchMatch && filterMatch;
    });
  }, [searchQuery, bookingFilter]);

  function getStatusColor(status) {
    switch (status) {
      case 'confirmed':
        return 'text-emerald-600 border-emerald-100 bg-emerald-50';
      case 'pending':
        return 'text-amber-600 border-amber-100 bg-amber-50';
      case 'completed':
        return 'text-blue-600 border-blue-100 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 border-red-100 bg-red-50';
      default:
        return 'text-gray-600 border-gray-200';
    }
  }


  function getInclusionIcon(inclusion) {
    switch (inclusion.toLowerCase()) {
      case 'flights':
        return <Plane className="w-4 h-4" />;
      case 'hotels':
        return <Home className="w-4 h-4" />;
      case 'meals':
        return <Utensils className="w-4 h-4" />;
      case 'tours':
        return <MapPin className="w-4 h-4" />;
      case 'transport':
        return <Bus className="w-4 h-4" />;
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6 flex-col md:items-start md:gap-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 ">My Bookings</h2>
          <div className="flex items-center gap-4 w-full">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full"
              />
            </div>
            <select
              value={bookingFilter}
              onChange={(e) => setBookingFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 "
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="size-7 text-blue-500" />
              <span className="text-blue-700 font-medium text-2xl">Total</span>
            </div>
            <p className="text-3xl font-bold text-blue-800">{allBookings.length}</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="size-7 text-emerald-500" />
              <span className="text-emerald-700 font-medium text-2xl">Confirmed</span>
            </div>
            <p className="text-3xl font-bold text-emerald-800">
              {allBookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-7 text-amber-500" />
              <span className="text-amber-700 font-medium text-2xl">Pending</span>
            </div>
            <p className="text-3xl font-bold text-amber-800">
              {allBookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="size-7 text-blue-500" />
              <span className="text-blue-700 font-medium text-2xl">Completed</span>
            </div>
            <p className="text-3xl font-bold text-blue-800">
              {allBookings.filter(b => b.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>

      {/* Bookings list */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-2 rounded-full text-lg font-medium border ${getStatusColor(booking.status)} flex items-center gap-1 w-fit`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <h3 className="text-3xl font-bold text-gray-800 mb-1">{booking.packageName}</h3>
                    <div className="flex items-center gap-4 text-gray-600 mb-2 text-xl">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-6" />
                        <span>{booking.destination}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="size-6" />
                        <span>{booking.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-lg">Booking Ref: {booking.bookingReference}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-800">₹{booking.price}</p>
                    <p className="text-gray-500 text-lg">{booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 mb-2 md:grid-cols-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-600 text-lg">Travel Dates</p>
                    <p className="font-medium text-gray-800 text-2xl">{booking.date} - {booking.endDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-600 text-lg mb-1">Booked On</p>
                    <p className="font-medium text-gray-800 text-2xl">{booking.bookingDate}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-gray-600 text-lg mb-2">Package Includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.inclusions.map((inclusion, i) => (
                      <div key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-lg">
                        {getInclusionIcon(inclusion)}
                        <span>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-5 flex-row">
                  <button className="flex items-center gap-2 !py-3 !px-5 bg-blue-500 !text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="flex items-center gap-2 !py-3 !px-5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Download className="size-6" />
                     Receipt
                  </button>
                  {booking.status === 'pending' && (
                    <button className="flex items-center gap-2 !py-3 !px-5 border bg-red-500 !text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || bookingFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Start planning your next adventure!'}
          </p>
          <Link
            to="/tour-packages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 !text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Browse Packages
          </Link>
        </div>
      )}
    </div>
  );
}
