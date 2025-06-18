import React from 'react';
import { Calendar, MapPin, Clock, X, Star } from 'lucide-react';
import Navbar from '../../Navbar/Navbar';

const upcomingTrips = [
    {
        id: 1,
        name: 'Bali Paradise Package',
        location: 'Bali, Indonesia',
        startDate: '2024-04-15',
        duration: '7 Days - 6 Nights',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        price: 899,
    },
    {
        id: 2,
        name: 'Swiss Alps Adventure',
        location: 'Switzerland',
        startDate: '2024-05-20',
        duration: '5 Days - 4 Nights',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
        price: 1299,
    }
];

function UpcomingTrips() {
    const handleCancelTrip = (tripId) => {
        console.log('Canceling trip:', tripId);
    };

    return (
        <>
            <Navbar isScrolled={true} />
            <div className="min-h-screen bg-gray-50 pt-32 pb-20">
                <div className="px-8 md:px-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 ml-5">
                        Upcoming Trips
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4">
                        {upcomingTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-md transition-all duration-500"
                            >
                                <div className="flex flex-col">
                                    <div className="w-full">
                                        <img
                                            src={trip.image}
                                            alt={trip.name}
                                            className="w-full object-cover h-100"
                                        />
                                    </div>

                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                    {trip.name}
                                                </h3>
                                                <div className="flex md:items-center items-start gap-4 text-gray-600 flex-col md:flex-row">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="size-6" />
                                                        <span>{trip.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="size-6" />
                                                        <span>{trip.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-gray-600 mb-6">
                                            <Calendar className="size-6" />
                                            <span>Starting {new Date(trip.startDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-base text-gray-500 mb-1">Total Price</p>
                                                <p className="text-3xl font-bold text-gray-800">
                                                    ${trip.price}
                                                </p>
                                            </div>

                                            <div className="flex gap-3 flex-col md:flex-row">
                                                <button
                                                    onClick={() => handleCancelTrip(trip.id)}
                                                    className="px-6 py-2 border-2 border-red-500 !text-red-500 rounded-xl font-medium hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                                                >
                                                    Cancel Trip
                                                </button>
                                                <button className="px-6 py-2 bg-blue-500 !text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpcomingTrips;