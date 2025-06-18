import { Camera, Image, Send, Star } from "lucide-react";
import { useState } from "react";

const ShareExperience = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  // Simulated image upload handler
  const handleImageUpload = () => {
    // In a real implementation, this would handle file upload
    const newImage = "https://images.unsplash.com/photo-1469474968028-56623f02e42e";
    setSelectedImages(prev => [...prev, newImage].slice(0, 4));
  };

  return (
    <div className="w-full max-w-7xl !mx-auto !px-8 !py-16 bg-white border-t border-gray-200 md:px-4">
      <div className="flex items-center justify-center gap-4 !mb-6">
        <div className="w-16 h-1 bg-blue-500 rounded-full" />
        <Camera className="size-12 text-blue-500" />
        <div className="w-16 h-1 bg-blue-500 rounded-full" />
      </div>
      <div className="max-w-3xl !mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center !mb-2">
          Share Your Journey
        </h2>
        <p className="text-gray-600 text-center !mb-12">
          Your experience helps others discover their next adventure
        </p>

        <div className="bg-gray-100 rounded-3xl">
          <div className="!p-8">
            {/* User Info */}
            <div className="flex items-center gap-10 !mb-8">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                className="size-30 !rounded-full !object-cover !ring-4 !ring-white"
              />
              <div>
                <h3 className="text-3xl font-semibold text-gray-900">
                  John Doe
                </h3>
                <p className="text-2xl text-gray-500">
                  Travel Enthusiast
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="!mb-6">
              <label className="text-2xl font-medium">
                Rate your experience
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                    className="!p-1 transition-colors duration-200"
                  >
                    <Star
                      className={`size-8 ${star <= (hoveredStar || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="!mb-6">
              <label className="text-2xl font-medium text-gray-700 !mb-2">
                Share your story
              </label>
              <textarea
                placeholder="Tell us about your travel experience..."
                className="w-full h-40 !p-4 bg-white rounded-xl border border-gray-200 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
              />
            </div>

            {/* Image Upload */}
            <div className="!mb-8">
                <label className="block text-2xl font-medium text-gray-800">
                  Share your travel moments
                </label>
                <div className="grid grid-cols-2 gap-4 !m-5">
                  {selectedImages.map((img, index) => (
                    <div key={index} className="relative !aspect-square rounded-2xl overflow-hidden">
                      <img src={img} alt="Travel memory" className="size-full object-cover" />
                      <button 
                        className="absolute top-2 right-4 !text-white hover:!text-gray-200 !text-5xl rounded-full transition-all duration-200"
                        onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {selectedImages.length < 4 && (
                    <button
                      onClick={handleImageUpload}
                      className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                    >
                      <Camera className="size-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Add Photo</span>
                    </button>
                  )}
                </div>
                <p className="text-xl text-gray-500">
                  Upload up to 4 photos to showcase your experience
                </p>
              </div>

            {/* Submit Button */}
            <button className="primary-btn !mb-5">
              Share Your Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
