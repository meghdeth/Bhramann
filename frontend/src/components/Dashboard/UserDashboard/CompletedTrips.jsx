import React, { useState } from 'react';
import { MapPin, Clock, Star, X } from 'lucide-react';

const completedTrips = [
    {
        id: 1,
        name: 'Santorini Getaway',
        location: 'Greece',
        completedDate: '2024-02-15',
        duration: '6 Days - 5 Nights',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        price: 999,
        rating: 0
    },
    {
        id: 2,
        name: 'Tokyo Explorer',
        location: 'Japan',
        completedDate: '2024-01-20',
        duration: '8 Days - 7 Nights',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        price: 1499,
        rating: 4.5
    }
];

function RatingModal({ tripId, tripName, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Rate Your Trip</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                <p className="text-gray-600 mb-6">{tripName}</p>

                {/* Star Rating */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            className="p-1"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Review Text */}
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full h-32 p-4 border border-gray-200 rounded-xl mb-6 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(rating, review)}
                        className="flex-1 px-6 py-3 bg-blue-500 !text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

function CompletedTrips() {
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleRatingSubmit = (rating, review) => {
        console.log('Rating submitted:', { tripId: selectedTrip, rating, review });
        setSelectedTrip(null);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="px-8 md:px-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 ml-5">
                        Completed Trips
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4">
                        {completedTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-luxury-hover transition-all duration-500"
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
                                            {trip.rating > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                    <span className="font-medium">{trip.rating}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            Completed on {new Date(trip.completedDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-base text-gray-500 mb-1">Total Price</p>
                                                <p className="text-3xl font-bold text-gray-800">
                                                    ${trip.price}
                                                </p>
                                            </div>

                                            <div className="flex gap-3 flex-col md:flex-row">
                                                {trip.rating === 0 && (
                                                    <button
                                                        onClick={() => setSelectedTrip(trip.id)}
                                                        className="px-6 py-2 bg-blue-500 !text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                                                    >
                                                        Rate Trip
                                                    </button>
                                                )}
                                                <button className="px-6 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200">
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

                {selectedTrip !== null && (
                    <RatingModal
                        tripId={selectedTrip}
                        tripName={completedTrips.find(t => t.id === selectedTrip)?.name || ''}
                        onClose={() => setSelectedTrip(null)}
                        onSubmit={handleRatingSubmit}
                    />
                )}
            </div>
        </>
    );
}

export default CompletedTrips;