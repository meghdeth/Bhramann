import React, { useState, useEffect } from "react";
import { CreditCardIcon, Package, TrendingUp, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from '../../../api';  // your axios setup

// Optional: Add styled-components here if needed

export default function SellerHome() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [userId, setUserId] = useState('');
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);
  const getUserIdFromStorage = () => {
    const storedUser = localStorage.getItem('bhramann_user');
    try {
      return storedUser ? JSON.parse(storedUser)?.id : null;
    } catch {
      return null;
    }
  };
  

  // Fetch packages from API on mount
  useEffect(() => {
    api.get("/api/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => {
        console.error("Failed to load packages:", err);

        if (err.response?.status === 401) {
          setError("You're not logged in. Please sign in to access your packages.");
        } else if (err.response?.status === 403) {
          setError("Your email is not verified. Please verify your email to continue.");
          setUserId(getUserIdFromStorage());
          setShowVerifyBtn(true);
        } else if (err.response?.status === 404) {
          setError("Package information could not be found.");
        } else if (err.response?.status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Unable to load packages. Please check your connection and try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const handleAction = (pkgId, action) => {
    setActiveDropdown(null);

    if (action === "view") {
      navigate(`/tour-package/${pkgId}`);
    } else if (action === "edit") {
      navigate(`/seller-dashboard/packages/modify-package/${pkgId}`);
    } else if (action === "delete") {
      if (!window.confirm("Are you sure you want to delete this package?")) return;
      api.delete(`/api/packages/${pkgId}`)
        .then(() => {
          setPackages(pkgs => pkgs.filter(p => p._id !== pkgId)); // Remove from UI
        })
        .catch(err => {
          console.error("Delete failed:", err);
          alert("Delete failed.");
        });
    }
  };

  useEffect(() => {
    const close = () => setActiveDropdown(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // Compute stats
  const todaysSales = packages.reduce((sum, pkg) => {
    const bookings = Number(pkg.bookings) || 0;
    const price = Number(pkg.priceRanges?.[0]?.price) || 0;
    return sum + (bookings * price);
  }, 0);

  const activePackages = packages.filter(p => p.status === "active").length;
  const monthlyRevenue = todaysSales; // You can update this logic if needed
  const totalBookings = packages.reduce((sum, pkg) => {
    const bookings = Number(pkg.bookings) || 0;
    return sum + bookings;
  }, 0);

  const stats = [
    {
      title: "Today's Sales", value: todaysSales.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
      }), icon: CreditCardIcon, color: "from-blue-500 to-blue-600"
    },
    { title: "Active Packages", value: activePackages, icon: Package, color: "from-emerald-500 to-emerald-600" },
    {
      title: "Monthly Revenue", value: monthlyRevenue.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
      }), icon: TrendingUp, color: "from-violet-500 to-violet-600"
    },
    { title: "Total Bookings", value: totalBookings, icon: Users, color: "from-amber-500 to-amber-600" }
  ];

  const topPackages = [...packages].sort((a, b) => b.bookings - a.bookings).slice(0, 3);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-600 animate-pulse">
        Loading your dashboard...
      </div>
    );
  }


  if (error) {
    return (
      <div>
        <p className="p-6 text-red-500">{error}</p>
        {showVerifyBtn && userId && (
          <button
            onClick={() => navigate('/verify-email', { state: { userId } })}
            className="primary-btn"
          >
            Verify
          </button>
        )}

      </div>
    );
  }

  return (
    <div className="w-full p-5">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12 grid-cols-1">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-lg shadow-md flex flex-col p-8">
            <div className="flex items-center gap-4">
              <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl shadow-md text-white mr-2`}>
                <stat.icon className="size-8" />
              </div>
              <div>
                <h3 className="text-black">{stat.title}</h3>
                <h1 className="text-gray-800 font-bold text-3xl">{stat.value}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Selling Packages */}
      <div className="bg-white rounded-2xl p-8 shadow-md mb-8 mt-15">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Top Selling Packages</h2>
          <Link to="/seller-dashboard/packages" className="text-blue-500 hover:text-blue-600">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-gray-600 font-medium">Package</th>
                <th className="text-left p-4 text-gray-600 font-medium">Price</th>
                <th className="text-left p-4 text-gray-600 font-medium">Sold</th>
                <th className="text-left p-4 text-gray-600 font-medium">Status</th>
                <th className="text-left p-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topPackages.map((pkg) => (
                <tr
                  key={pkg._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownPosition({ x: e.clientX, y: e.clientY });
                    setActiveDropdown(activeDropdown === pkg._id ? null : pkg._id);
                  }}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-300"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={pkg.mainPhotos?.[0]} alt={pkg.name} className="size-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-medium text-gray-800">{pkg.name}</h4>
                        <p className="text-lg text-gray-500">{pkg.itinerary.length} Days</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell p-4 text-gray-800">₹{pkg.priceRanges?.[0]?.price.toLocaleString()}</td>
                  <td className="hidden md:table-cell p-4 text-gray-800">{pkg.bookings} units</td>
                  <td className="hidden md:table-cell p-4">
                    <span className={`px-3 py-1 rounded-full text-lg font-medium ${pkg.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}>{pkg.status}</span>
                  </td>
                  <td className="table-cell p-4 text-gray-400 text-sm">Click row for actions</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dropdown Actions */}
      {activeDropdown && (
        <div
          className="fixed bg-white rounded-xl shadow-lg py-2 z-50 w-48"
          style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => handleAction(activeDropdown, "view")} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            View Details
          </button>
          <button onClick={() => handleAction(activeDropdown, "edit")} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            Edit
          </button>
          <button onClick={() => handleAction(activeDropdown, "delete")} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
