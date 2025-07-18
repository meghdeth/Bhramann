import React, { useState } from 'react';
import UpcomingTrips from './UpcomingTrips';
import CompletedTrips from './CompletedTrips';
import { GraduationCap, MapPin, Plane, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUser } from '../../../auth';

export default function UserHome() {
  const [user, setUser] = useState(getUser());

  const recentTrips = [
    {
      id: '1',
      title: 'Cultural Heritage Tour',
      destination: 'Rajasthan',
      date: '2024-01-05',
      rating: 5,
      image: 'https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Wildlife Safari',
      destination: 'Jim Corbett',
      date: '2023-12-20',
      rating: 4,
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  return (
    <div>
      <div className="bg-blue-50 p-4">
        <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-8 text-blue-600" />
            <span className="text-blue-800">
              Are you a student? Get up to 20% discount on all packages!
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={'verify-student'}
              className="px-4 py-2 bg-blue-600 !text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Verify Student Status
            </Link>

          </div>
        </div>
      </div>
      <div className="rounded-3xl p-8 mt-4">
        <h1 className="text-4xl font-bold my-2">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-2xl">Ready for your next adventure?</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Trips</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>

        <div className="space-y-4">
          {recentTrips.map((trip) => (
            <div key={trip.id} className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-xl transition-colors duration-200 cursor-pointer">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">{trip.title}</h3>
                <div className="flex items-center space-x-2 mt-1 text-xl text-slate-600">
                  <MapPin className="w-3 h-3" />
                  <span>{trip.destination}</span>
                  <span>•</span>
                  <span>{trip.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="size-6 text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-medium text-slate-700">{trip.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 