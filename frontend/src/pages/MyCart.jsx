import React, { useState } from 'react';
import CostBreakdown from '../components/Cart/CostBreakdown';
import CartItem from "../components/Cart/CartItem";



const cartItems = Array.from({ length: 3 }, (_, i) => ({
  id: 1,
  name: 'Bali Paradise Package',
  duration: '7 Days - 6 Nights',
  ratings: 4.8,
  reviews: 1250,
  price: 899,
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
}));


function MyCart() {
  const [currentItems] = useState(cartItems);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 md:px-4">
        {/* Header Section */}
        
          <h1 className="text-center mb-16 mt-16 text-7xl font-bold md:text-5xl">
            Your Travel Cart
          </h1>
        {/* Main Content */}
        <div className="flex gap-12 flex-col md:flex-row">
          {/* Cart Items */}
          <div className="flex-[2]">
            <div className="space-y-8">
              {currentItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="flex-1 md:w-full">
            <div className="sticky top-32">
              <CostBreakdown items={currentItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;