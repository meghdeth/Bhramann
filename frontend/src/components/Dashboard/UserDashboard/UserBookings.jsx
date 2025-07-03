import React from 'react';
import UpcomingTrips from './UpcomingTrips';
import CompletedTrips from './CompletedTrips';

export default function UserBookings() {
  return (
    <div>
            <UpcomingTrips />
            <CompletedTrips />
    </div>
  );
} 