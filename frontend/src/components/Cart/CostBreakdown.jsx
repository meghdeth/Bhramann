import React from 'react';
import { ShoppingCart, CreditCard, Gift, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

function CostBreakdown({ items }) {
  // Function to calculate cost breakdown
  const calculateCosts = () => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const convenienceFee = subtotal * 0.04; // 4% convenience fee
    const taxes = subtotal * 0.08; // 8% tax
    const total = subtotal + convenienceFee + taxes;

    return { subtotal, convenienceFee, taxes, total };
  };

  const { subtotal, convenienceFee, taxes, total } = calculateCosts();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg ">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">
        Order Summary
      </h2>
      <p className="text-gray-600 mb-8">Complete your luxury travel booking</p>

      {/* Promo Code */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 relative">
          <Gift className="input-icon" />
          <input
            type="text"
            placeholder="Enter promo code"
            className="pl-12 input-base"
          />
        </div>
        <button className="px-6 bg-blue-500 !text-white rounded-xl hover:bg-blue-600 transition-colors duration-300">
          Apply
        </button>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-5 h-5" />
            <span>Subtotal</span>
          </div>
          <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <CreditCard className="w-5 h-5" />
            <span>Convenience Fee</span>
          </div>
          <span className="text-gray-800 font-medium">${convenienceFee.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-5 h-5" />
            <span>Taxes</span>
          </div>
          <span className="text-gray-800 font-medium">${taxes.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gray-50 p-6 rounded-2xl mb-8">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-600 mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-gray-800">${total.toFixed(2)}</p>
          </div>
          <span className="text-gray-500">USD</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button className="bg-blue-500 hover:bg-blue-600 tertiary-btn">
          Proceed to Checkout
        </button>

        <Link
          to="/"
          className="border-2 border-gray-200 text-gray-700 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300"
        >
          <ShoppingCart className="w-5 h-5" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CostBreakdown;
