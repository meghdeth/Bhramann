import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Calendar,
  CheckCircle,
  LogOut
} from 'lucide-react';
import api from '../../api';

export default function ProfileDropdown({ isOpen, onClose, onLogout, user }) {
  const [orders, setOrders] = useState([]);

  // When dropdown opens, fetch orders
  useEffect(() => {
    if (!isOpen) return;
    api.get('/api/orders/my-orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders:', err));
  }, [isOpen]);

  if (!isOpen) return null;

  // Split into upcoming vs completed (e.g. 7 days ago)
  const now = Date.now();
  const upcoming = orders.filter(o => Date.parse(o.createdAt) > now - 7*24*3600*1000);
  const completed = orders.filter(o => Date.parse(o.createdAt) <= now - 7*24*3600*1000);

  return (
    <>
      {/* click-outside catcher */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute top-full right-0 mt-2 w-90 bg-white rounded-2xl shadow-md overflow-hidden z-50">
        {/* --- User Info --- */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* --- Upcoming Trips --- */}
        <div className="p-2">
          <h4 className="px-4 py-2 text-gray-600 font-medium">Upcoming Trips</h4>
          {upcoming.length > 0 ? upcoming.map(o => (
            <Link
              key={o._id}
              to={`/packages/${o.package._id}`}
              className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
              onClick={onClose}
            >
              <Calendar className="size-6 text-gray-500" />
              <div>
                <p className="font-medium">{o.package.title}</p>
                <p className="text-sm text-gray-500">₹{o.package.price}</p>
              </div>
            </Link>
          )) : (
            <p className="px-4 py-3 text-gray-500">No upcoming trips</p>
          )}

          {/* --- Completed Trips --- */}
          <h4 className="px-4 py-2 text-gray-600 font-medium mt-2">Completed Trips</h4>
          {completed.length > 0 ? completed.map(o => (
            <Link
              key={o._id}
              to={`/packages/${o.package._id}`}
              className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
              onClick={onClose}
            >
              <CheckCircle className="size-6 text-gray-500" />
              <div>
                <p className="font-medium">{o.package.title}</p>
                <p className="text-sm text-gray-500">₹{o.package.price}</p>
              </div>
            </Link>
          )) : (
            <p className="px-4 py-3 text-gray-500">No completed trips</p>
          )}

          {/* --- Logout Button --- */}
          <div className="border-t border-gray-100 mt-2">
            <button
              onClick={() => {
                onLogout();  // clear auth & user in Navbar
                onClose();   // close the dropdown
              }}
              className="flex items-center gap-4 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
