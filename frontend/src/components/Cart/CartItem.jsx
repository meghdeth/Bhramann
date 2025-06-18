import React, { useState } from 'react';
import { Star, Plus, Minus, Clock } from 'lucide-react';

const CartItem = ({item}) => {
  const [travelers, setTravelers] = useState(1);
  
  const handleIncrease = () => setTravelers((prev) => prev + 1);
  const handleDecrease = () => {
    if (travelers > 1) setTravelers((prev) => prev - 1);
  };

  return (
        <div
          className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[25rem] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-3xl font-bold text-white mb-2">{item.name}</h3>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl">{item.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl">{item.ratings}/5</span>
                  <span className="text-white/70">({item.reviews} Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex md:items-center justify-between gap-8 mb-8 md:flex-row flex-col items-stretch md:gap-6">
              {/* Travelers Selection */}
              <div className="flex-1">
                <label className="text-gray-600 text-lg mb-3 flex items-center gap-2">
                  Number of Travelers
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrease}
                    disabled={travelers <= 1}
                    className="w-12 h-12 flex items-center justify-center bg-blue-500 !text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-semibold text-gray-800">{travelers}</span>
                    <p className="text-gray-500">Travelers</p>
                  </div>
                  <button
                    onClick={handleIncrease}
                    className="w-12 h-12 flex items-center justify-center bg-blue-500 !text-white rounded-xl hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price Information */}
              <div className="flex-1">
                <p className="text-gray-600 text-lg mb-3">Price per Person</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-gray-800">${item.price}</span>
                  <span className="text-gray-500 mb-1">USD</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex-1">
                <p className="text-gray-600 text-lg mb-3">Total Price</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-blue-600">
                    ${travelers * item.price}
                  </span>
                  <span className="text-gray-500 mb-1">USD</span>
                </div>
              </div>
            </div>

            {/* <button className="w-full bg-red-500 !text-white py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-300 transform"> */}
            <button className="bg-red-500 hover:bg-red-600 tertiary-btn">
              Remove from Cart
            </button>
          </div>
        </div>
  );
};

export default CartItem;
