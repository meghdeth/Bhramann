import { CreditCardIcon, MoreVertical, Package, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

function SellerHome() {
  const stats = [
    {
      title: "Today's Sales",
      value: "$5,000",
      icon: CreditCardIcon,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Packages",
      value: "25",
      icon: Package,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Monthly Revenue",
      value: "$42,000",
      icon: TrendingUp,
      color: "from-violet-500 to-violet-600"
    },
    {
      title: "Total Customers",
      value: "1,240",
      icon: Users,
      color: "from-amber-500 to-amber-600"
    }
  ];

  const topPackages = [
    {
      id: 1,
      name: "Kullu - Manali - Rohtang Package",
      duration: "5 Nights - 4 Days",
      price: 1200,
      sold: 50,
      status: "In Stock",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21"
    },
    {
      id: 2,
      name: "Shimla - Kufri Package",
      duration: "3 Nights - 2 Days",
      price: 800,
      sold: 30,
      status: "Out of Stock",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8"
    },
  ];

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleAction = (id, action) =>{
    alert(`${action} is clicked`);
}
  return (
    <div className="w-full p-5">
      <div className="grid md:grid-cols-4 gap-6 mb-12 grid-cols-1">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md flex flex-col p-8">
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


      <div className="bg-white rounded-2xl p-8 shadow-md mb-8 mt-15">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Top Selling Packages
          </h2>
          <button className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
            View All
          </button>
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
                  key={pkg.id}
                  className="border-b border-gray-100 transition-colors duration-300"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="size-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{pkg.name}</h4>
                        <p className="text-lg text-gray-500">{pkg.duration}</p>
                      </div>
                    </div>
                  </td>

                  {/* Hide these on mobile, show on desktop */}
                  <td className="hidden md:table-cell p-4">
                    <span className="font-medium text-gray-800">${pkg.price}</span>
                  </td>
                  <td className="hidden md:table-cell p-4">
                    <span className="font-medium text-gray-800">{pkg.sold} units</span>
                  </td>
                  <td className="hidden md:table-cell p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-lg font-medium ${pkg.status === "In Stock"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="table-cell p-4">
                    <div className="relative">
                      <button onClick={() => setActiveDropdown(activeDropdown === pkg.id ? null : pkg.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                  {activeDropdown === pkg.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10">
                        <button
                          onClick={() => handleAction(pkg.id, 'view')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAction(pkg.id, 'edit')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleAction(pkg.id, 'delete')}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default SellerHome;
