import React, { useState, useEffect } from 'react';
import { Plus, Minus, X, Upload, ChevronLeft, Calendar, MapPin, Clock, DollarSign, Users, Image, Bed, Car, Coffee, Plane, Star, User, Train, Ship, Globe, Ticket, Utensils, Camera, ClipboardCheckIcon, ClipboardCheck } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import api from '../../api';             // ← your axios instance

function AddOrUpdatePackage() {
  const location = useLocation();
  const { id } = useParams(); // Get the package ID from the URL
  const isEditMode = location.pathname.startsWith('/seller-dashboard/packages/modify-package'); // Check if in edit mode

  const navigate = useNavigate();
  // Single state object to store all package details
  const [packageDetails, setPackageDetails] = useState({
    name: '',
    description: '',
    location: '',
    priceType: 'variable',
    priceRanges: [{ from: 1, to: 5, price: 8000 }],
    dateType: 'range',
    availableDates: { start: '', end: '' },
    specificDates: [''],
    quantity: '',
    mainPhotos: [],
    itinerary: [
      { id: 1, title: 'Arrival Day', activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'] }
    ],
    inclusions: [
      { id: 1, title: 'Accommodation', details: ['4-star hotel accommodation', 'Daily breakfast'] }
    ],
    highlights: [
      {
        id: 1,
        title: '',
        image: ''
      }
    ],
    stays: [
      {
        id: 1,
        hotel: '',
        roomType: '',
        amenities: [],
        images: [],
        description: ''
      }
    ]
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Fetch package data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      api.get(`/api/packages/${id}`)
        .then(({ data }) => {
          const pd = {
            ...data,
            availableDates: {
              start: data.availableDates?.start ? new Date(data.availableDates.start) : null,
              end:   data.availableDates?.end   ? new Date(data.availableDates.end)   : null
            },
            specificDates: data.specificDates?.map(d => d ? new Date(d) : null) || [null]
          };
          setPackageDetails(pd);
        })
        .catch(err => {
          console.error('Failed to load package:', err);
          // optionally navigate away on 404
        });
    }
  }, [isEditMode, id]);

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Pricing & Availability' },
    { number: 3, title: 'Photos & Media' },
    { number: 4, title: 'Itinerary' },
    { number: 5, title: 'Inclusions & Stays' }
  ];

  // Helper function to update nested state
  const updatePackageDetails = (key, value) => {
    setPackageDetails((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddPriceRange = () => {
    updatePackageDetails('priceRanges', [
      ...packageDetails.priceRanges,
      { from: 0, to: 0, price: 0 }
    ]);
  };

  const handleAddSpecificDate = () => {
    updatePackageDetails('specificDates', [...packageDetails.specificDates, '']);
  };

  // Handler to add a new highlight
  const handleAddHighlight = () => {
    const newHighlight = {
      id: packageDetails.highlights.length + 1,
      title: '',
      image: '',
    };
    updatePackageDetails('highlights', [...packageDetails.highlights, newHighlight]);
  };

  const handleUpdateHighlight = (index, key, value) => {
    const updatedHighlights = [...packageDetails.highlights];
    updatedHighlights[index][key] = value;
    updatePackageDetails('highlights', updatedHighlights);
  };

  const handleRemoveHighlight = (index) => {
    const updatedHighlights = packageDetails.highlights.filter((_, i) => i !== index);
    updatePackageDetails('highlights', updatedHighlights);
  };

  const handleHighlightImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateHighlight(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMorePhotos = () => {
    setPackageDetails((prevDetails) => {
      return {
        ...prevDetails,
        mainPhotos: [...prevDetails.mainPhotos, ""]
      };
    });
  };

  const handlePhotoChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPhotos = [...packageDetails.mainPhotos];
        updatedPhotos[index] = reader.result; // Use the base64 string for immediate preview
        setPackageDetails({ ...packageDetails, mainPhotos: updatedPhotos });
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    }
  };

  const handleAddDay = () => {
    const newDay = {
      id: packageDetails.itinerary.length + 1,
      title: `Day ${packageDetails.itinerary.length + 1}`,
      activities: ['New activity']
    };
    updatePackageDetails('itinerary', [...packageDetails.itinerary, newDay]);
  };

  const handleAddInclusion = () => {
    const newInclusion = {
      id: packageDetails.inclusions.length + 1,
      title: `Inclusion ${packageDetails.inclusions.length + 1}`,
      details: ['New detail']
    };
    updatePackageDetails('inclusions', [...packageDetails.inclusions, newInclusion]);
  };

  // Map keywords to Lucide icons
  const Icon = (Component) => <Component className="size-5 text-blue-500" />;

  // Icon mapping for different inclusion keywords
  const iconMapping = {
    hotel: Icon(Bed),
    bed: Icon(Bed),
    transport: Icon(Car),
    car: Icon(Car),
    breakfast: Icon(Coffee),
    coffee: Icon(Coffee),
    flight: Icon(Plane),
    plane: Icon(Plane),
    star: Icon(Star),
    meal: Icon(Utensils),
    lunch: Icon(Utensils),
    dinner: Icon(Utensils),
    ticket: Icon(Ticket),
    pass: Icon(Ticket),
    guide: Icon(User),
    user: Icon(User),
    sightseeing: Icon(MapPin),
    map: Icon(MapPin),
    tour: Icon(Globe),
    world: Icon(Globe),
    photography: Icon(Camera),
    camera: Icon(Camera),
    train: Icon(Train),
    railway: Icon(Train),
    cruise: Icon(Ship),
    ship: Icon(Ship),
    beach: Icon(Ship),
  };

  // Function to get the relevant icon based on input
  const getIcon = (input) => {
    const key = Object.keys(iconMapping).find(k => input.toLowerCase().includes(k));
    return iconMapping[key] || Icon(ClipboardCheck); // Default Icon
  };

  const handleAddStay = () => {
    updatePackageDetails('stays', [
      ...packageDetails.stays,
      {
        hotel: '',
        roomType: '',
        amenities: [],
        images: [],
      }
    ]);
  };
  const handleAddStayImage = (e, stayIndex, imageIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedStays = [...packageDetails.stays];
        if (!updatedStays[stayIndex].images) {
          updatedStays[stayIndex].images = [];
        }
        updatedStays[stayIndex].images[imageIndex] = reader.result;
        updatePackageDetails('stays', updatedStays);
      };
      reader.readAsDataURL(file);
    }
  };

  const buildPayload = () => ({
    ...packageDetails,
    availableDates: {
      start: packageDetails.availableDates.start
               ? packageDetails.availableDates.start.toString()
               : null,
      end: packageDetails.availableDates.end
               ? packageDetails.availableDates.end.toString()
               : null
    },
    specificDates: packageDetails.specificDates.map(d =>
      d ? d.toString() : null
    )
  });

  const handleAddStayImageSlot = (stayIndex) => {
    const updatedStays = [...packageDetails.stays];
    if (!updatedStays[stayIndex].images) {
      updatedStays[stayIndex].images = [];
    }
    updatedStays[stayIndex].images.push('');
    updatePackageDetails('stays', updatedStays);
  };

  const handleCreatePackage = async () => {
    try {
      const payload = buildPayload();
      await api.post('/api/packages', payload);
      navigate('/seller-dashboard/packages');
    } catch (err) {
      console.error('Create failed:', err);
      alert('Failed to create package');
    }
  };

  const handleUpdatePackage = async () => {
    try {
      const payload = buildPayload();
      await api.put(`/api/packages/${id}`, payload);
      navigate('/seller-dashboard/packages');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update package');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0">
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/seller-dashboard/packages"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="size-8" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditMode ? 'Edit Package' : 'Create New Package'}
              </h1>
            </div>
            <button className="px-6 py-2 bg-blue-500 !text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-0.5">
              {isEditMode ? 'Update Draft' : 'Save Draft'}
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mt-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex-1 relative"
                onClick={() => setCurrentStep(step.number)}
              >
                <div className={`
                  flex flex-col items-center cursor-pointer
                  ${currentStep === step.number ? 'opacity-100' : 'opacity-60'}
                `}>
                  <div className={`
                    size-10 rounded-full flex items-center justify-center text-lg font-medium mb-2
                    ${currentStep >= step.number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    {step.number}
                  </div>
                  <span className="md:text-lg text-sm font-medium text-gray-600">{step.title}</span>
                </div>
                {step.number !== steps.length && (
                  <div className={`
                    absolute top-5 left-[70%] w-[60%] md:left-[60%] md:w-[80%] h-[2px]
                    ${currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {/* Step 1: Basic Details */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Basic Details Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Package Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    value={packageDetails.name}
                    onChange={(e) => updatePackageDetails('name', e.target.value)}
                    placeholder="Enter an attractive title for your package"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={packageDetails.description}
                    onChange={(e) => updatePackageDetails('description', e.target.value)}
                    placeholder="Describe your package in detail"
                    rows={4}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={packageDetails.location}
                      onChange={(e) => updatePackageDetails('location', e.target.value)}
                      placeholder="Where is this package located?"
                      className="pl-12 input-base"
                    />
                    <MapPin className="input-icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Package Highlights</h2>
                <button
                  onClick={handleAddHighlight}
                  className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
                >
                  + Add Highlight
                </button>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {packageDetails.highlights.map((highlight, index) => (
                  <div key={highlight.id} className="relative">
                    {/* Highlight Image */}
                    <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group mb-4">
                      {highlight.image ? (
                        <img
                          src={highlight.image}
                          alt={`Highlight ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Upload className="size-8 text-gray-400 mb-2" />
                          <span className="text-gray-500">Upload Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <label className="px-4 py-2 bg-white rounded-lg text-gray-800 font-medium cursor-pointer">
                          {highlight.image ? 'Change Image' : 'Add photo'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleHighlightImageUpload(e, index)}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Highlight Title */}
                    <input
                      type="text"
                      value={highlight.title}
                      onChange={(e) => handleUpdateHighlight(index, 'title', e.target.value)}
                      className="input-base"
                      placeholder="Enter highlight title"
                    />

                    {/* Remove Highlight Button */}
                    <button
                      onClick={() => handleRemoveHighlight(index)}
                      className="absolute -top-2 -right-2 p-1 bg-gray-500 !text-white rounded-full"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pricing & Availability */}
        {currentStep === 2 && (
          <div className="space-y-8">
            {/* Price Matrix */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Pricing Structure</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={packageDetails.priceType === 'fixed'}
                      onChange={() => updatePackageDetails('priceType', 'fixed')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span>Fixed Price</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={packageDetails.priceType === 'variable'}
                      onChange={() => updatePackageDetails('priceType', 'variable')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span>Variable Price (Based on group size)</span>
                  </label>
                </div>

                {packageDetails.priceType === 'variable' && (
                  <div className="space-y-4">
                    {packageDetails.priceRanges.map((range, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1 grid grid-cols-3 gap-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={range.from}
                              onChange={(e) => {
                                const newRanges = [...packageDetails.priceRanges];
                                newRanges[index].from = parseInt(e.target.value);
                                updatePackageDetails('priceRanges', newRanges);
                              }}
                              className="pl-10 input-base"
                              placeholder="From"
                            />
                            <Users className="input-icon" />
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={range.to}
                              onChange={(e) => {
                                const newRanges = [...packageDetails.priceRanges];
                                newRanges[index].to = parseInt(e.target.value);
                                updatePackageDetails('priceRanges', newRanges);
                              }}
                              className="pl-10 input-base"
                              placeholder="To"
                            />
                            <Users className="input-icon" />
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={range.price}
                              onChange={(e) => {
                                const newRanges = [...packageDetails.priceRanges];
                                newRanges[index].price = parseInt(e.target.value);
                                updatePackageDetails('priceRanges', newRanges);
                              }}
                              className="pl-10 input-base"
                              placeholder="Price per person"
                            />
                            <DollarSign className="input-icon" />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newRanges = packageDetails.priceRanges.filter((_, i) => i !== index);
                            updatePackageDetails('priceRanges', newRanges);
                          }}
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddPriceRange}
                      className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
                    >
                      + Add Price Range
                    </button>
                  </div>
                )}

                {packageDetails.priceType === 'fixed' && (
                  <div className="relative">
                    <input
                      type="number"
                      value={packageDetails.priceRanges[0]?.price ?? ''}
                      onChange={(e) => {
                        const newRanges = [{ from: 1, to: 1, price: parseInt(e.target.value) }];
                        updatePackageDetails('priceRanges', newRanges);
                      }}
                      className="pl-10 input-base"
                      placeholder="Enter fixed price per person"
                    />
                    <DollarSign className="input-icon" />
                  </div>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Availability</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={packageDetails.dateType === 'range'}
                      onChange={() => updatePackageDetails('dateType', 'range')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span>Date Range</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={packageDetails.dateType === 'separate'}
                      onChange={() => updatePackageDetails('dateType', 'separate')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span>Specific Dates</span>
                  </label>
                </div>

                {packageDetails.dateType === 'range' ? (
                  <div className="relative">
                    <DatePicker
                      selected={packageDetails.availableDates.start ? new Date(packageDetails.availableDates.start) : null}
                      onChange={(dates) => {
                        const [start, end] = dates;
                        updatePackageDetails("availableDates", {
                          start: start ? start.toLocaleDateString("en-CA") : "",
                          end: end ? end.toLocaleDateString("en-CA") : "",
                        });
                      }}
                      startDate={packageDetails.availableDates.start ? new Date(packageDetails.availableDates.start) : null}
                      endDate={packageDetails.availableDates.end ? new Date(packageDetails.availableDates.end) : null}
                      selectsRange
                      placeholderText="Select a date range"
                      dateFormat="dd MMM yyyy"
                      minDate={new Date()}
                      showPopperArrow={false}
                      className="pl-10 input-base"
                      onFocus={(e) => e.target.blur()}
                      isClearable

                    />
                    <Calendar className="input-icon" />
                  </div>

                ) : (
                  <div className="space-y-4">
                    {packageDetails.specificDates.map((date, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1 relative group mr-5">
                          <div className="input-icon">
                            <Calendar className="text-gray-400 size-6" />
                          </div>
                          <DatePicker
                            selected={packageDetails.specificDates[index] ? new Date(packageDetails.specificDates[index]) : null}
                            onChange={(date) => {
                              const newDates = [...packageDetails.specificDates];
                              newDates[index] = date ? date.toLocaleDateString("en-CA") : ""; // "en-CA" gives "YYYY-MM-DD" format
                              updatePackageDetails("specificDates", newDates);
                            }}
                            placeholderText="Select a travel date"
                            dateFormat="dd MMM yyyy"
                            minDate={new Date()}
                            showPopperArrow={false}
                            className="input-base pl-12"
                            onFocus={(e) => e.target.blur()}

                          />
                        </div>
                        <button
                          onClick={() => {
                            const newDates = packageDetails.specificDates.filter((_, i) => i !== index);
                            updatePackageDetails('specificDates', newDates);
                          }}
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSpecificDate}
                      className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
                    >
                      <Plus className="size-4" />
                      Add Another Date
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Available Spots
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={packageDetails.quantity}
                      onChange={(e) => updatePackageDetails('quantity', e.target.value)}
                      className="pl-10 input-base"
                      placeholder="Enter total available spots"
                    />
                    <Users className="input-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos & Media */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* Main Photos */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className='flex items-center justify-between mb-6'>
                <h2 className="text-2xl font-semibold">Package Photos</h2>
                <button
                  onClick={handleAddMorePhotos}
                  className="mt-6 px-4 py-2 bg-blue-500 !text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
                >+ Add More Photos
                </button></div>
              <div className="grid grid-cols-3 gap-6">
                {/* Main Photo */}
                <div className="col-span-2">
                  <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group">
                    {packageDetails.mainPhotos[0] ? (
                      <img
                        src={packageDetails.mainPhotos[0]}
                        alt="Main"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Upload className="size-8 text-gray-400 mb-2" />
                        <span className="text-gray-500">Upload Main Photo</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <label className="px-4 py-2 bg-white rounded-lg text-gray-800 font-medium cursor-pointer">
                        {packageDetails.mainPhotos[0] ? 'Change Photo' : 'Add Photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoChange(e, 0)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Gallery Grid */}
                <div className="space-y-6">
                  {[1, 2].map((index) => (
                    <div key={index} className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group">
                      {packageDetails.mainPhotos[index] ? (
                        <img
                          src={packageDetails.mainPhotos[index]}
                          alt={`Gallery ${index}`}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Upload className="size-6 text-gray-400 mb-1" />
                          <span className="text-lg text-gray-500">Upload Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <label className="px-3 py-1.5 bg-white rounded-lg text-gray-800 text-lg cursor-pointer">
                          {packageDetails.mainPhotos[index] ? 'Change Photo' : 'Add Photo'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoChange(e, index)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-6">
                {packageDetails.mainPhotos.slice(3).map((photo, index) => (
                  <div key={index + 3} className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group">
                    {photo ? (
                      <img
                        src={photo}
                        alt={`Gallery ${index + 3}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Upload className="size-6 text-gray-400 mb-1" />
                        <span className="text-lg text-gray-500">Upload Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <label className="px-3 py-1.5 bg-white rounded-lg text-gray-800 text-lg cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoChange(e, index + 3)}
                        />
                        Upload
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Itinerary */}
        {currentStep === 4 && (
          <div className="space-y-8">
            {/* Itinerary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Daily Itinerary</h2>
                <button
                  onClick={handleAddDay}
                  className="px-4 py-2 bg-blue-500 !text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
                >
                  + Add Day
                </button>
              </div>

              <div className="space-y-6">
                {packageDetails.itinerary.map((day, dayIndex) => (
                  <div
                    key={day.id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const newItinerary = [...packageDetails.itinerary];
                          newItinerary[dayIndex].title = e.target.value;
                          updatePackageDetails('itinerary', newItinerary);
                        }}
                        className="pr-10 input-base"
                        placeholder={`Day ${day.id}`}
                      />
                      <button
                        onClick={() => {
                          const newItinerary = packageDetails.itinerary.filter(d => d.id !== day.id);
                          updatePackageDetails('itinerary', newItinerary);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
                      >
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            {getIcon(activity)}
                          </div>
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => {
                              const newItinerary = [...packageDetails.itinerary];
                              newItinerary[dayIndex].activities[actIndex] = e.target.value;
                              updatePackageDetails('itinerary', newItinerary);
                            }}
                            className="pr-10 input-base"
                            placeholder="Add activity"
                          />
                          <button
                            onClick={() => {
                              const newItinerary = [...packageDetails.itinerary];
                              newItinerary[dayIndex].activities = day.activities.filter((_, i) => i !== actIndex);
                              updatePackageDetails('itinerary', newItinerary);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newItinerary = [...packageDetails.itinerary];
                          newItinerary[dayIndex].activities.push('');
                          updatePackageDetails('itinerary', newItinerary);
                        }}
                        className="text-blue-500 hover:text-blue-600 text-lg flex items-center gap-1 ml-11"
                      >
                        + Add Activity
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Inclusions & Stays */}
        {currentStep === 5 && (
          <div className="space-y-8">
            {/* Package Inclusions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Package Inclusions</h2>
                <button
                  onClick={handleAddInclusion}
                  className="px-4 py-2 bg-blue-500 !text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
                >
                  Add Inclusion
                </button>
              </div>

              <div className="space-y-6">
                {packageDetails.inclusions.map((inclusion, inclusionIndex) => (
                  <div
                    key={inclusion.id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={inclusion.title}
                        onChange={(e) => {
                          const newInclusions = [...packageDetails.inclusions];
                          newInclusions[inclusionIndex].title = e.target.value;
                          updatePackageDetails('inclusions', newInclusions);
                        }}
                        className="input-base pr-10"
                        placeholder="Inclusion Title"
                      />
                      <button
                        onClick={() => {
                          const newInclusions = packageDetails.inclusions.filter((_, i) => i !== inclusionIndex);
                          updatePackageDetails('inclusions', newInclusions);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
                      >
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {inclusion.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            {getIcon(detail)}
                          </div>
                          <input
                            type="text"
                            value={detail}
                            onChange={(e) => {
                              const newInclusions = [...packageDetails.inclusions];
                              newInclusions[inclusionIndex].details[detailIndex] = e.target.value;
                              updatePackageDetails('inclusions', newInclusions);
                            }}
                            className="input-base pr-10"
                            placeholder="Inclusion Detail"
                          />
                          <button
                            onClick={() => {
                              const newInclusions = [...packageDetails.inclusions];
                              newInclusions[inclusionIndex].details = newInclusions[inclusionIndex].details.filter(
                                (_, i) => i !== detailIndex
                              );
                              updatePackageDetails('inclusions', newInclusions);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newInclusions = [...packageDetails.inclusions];
                          newInclusions[inclusionIndex].details.push('');
                          updatePackageDetails('inclusions', newInclusions);
                        }}
                        className="text-blue-500 hover:text-blue-600 text-lg flex items-center gap-1 ml-11"

                      >
                        + Add Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stays */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Accommodations</h2>
                <button
                  onClick={handleAddStay}
                  className="px-4 py-2 bg-blue-500 !text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
                >
                  Add Accommodation
                </button>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                {packageDetails.stays.map((stay, stayIndex) => (
                  <div key={stayIndex} className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors duration-200">
                    {/* Image Gallery */}
                    <button
                      onClick={() => {
                        const newStays = packageDetails.stays.filter((_, i) => i !== stayIndex);
                        updatePackageDetails('stays', newStays);
                      }}
                      className="pr-6 pt-6 float-right transition-colors duration-200"
                    >
                      <X className="size-6" />
                    </button>
                    <div className="p-10 mt-5 space-y-4">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stay.images.map((photo, imageIndex) => (
                          <div key={imageIndex} className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group">
                            {photo ? (
                              <img
                                src={photo}
                                alt={`Room ${imageIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full">
                                <Upload className="size-6 text-gray-400 mb-1" />
                                <span className="text-lg text-gray-500">Upload Image</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <label className="px-3 py-1.5 bg-white rounded-lg text-gray-800 text-lg cursor-pointer">
                                {photo ? 'Change Photo' : 'Upload'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleAddStayImage(e, stayIndex, imageIndex)}
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                        {(!stay.images || stay.images.length < 4) && (
                          <button
                            onClick={() => handleAddStayImageSlot(stayIndex)}
                            className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                          >
                            <Plus className="size-8 text-gray-400" />
                            <span className="text-sm text-gray-500">Add Image Slot</span>
                          </button>
                        )}
                      </div>


                      <input
                        type="text"
                        value={stay.hotel}
                        onChange={(e) => {
                          const newStays = [...packageDetails.stays];
                          newStays[stayIndex].hotel = e.target.value;
                          updatePackageDetails('stays', newStays);
                        }}
                        className="input-base"
                        placeholder="Hotel name"
                      />

                      <input
                        type="text"
                        value={stay.roomType}
                        onChange={(e) => {
                          const newStays = [...packageDetails.stays];
                          newStays[stayIndex].roomType = e.target.value;
                          updatePackageDetails('stays', newStays);
                        }}
                        className="input-base"
                        placeholder="Room type"
                      />

                      <textarea
                        value={stay.description}
                        onChange={(e) => {
                          const newStays = [...packageDetails.stays];
                          newStays[stayIndex].description = e.target.value;
                          updatePackageDetails('stays', newStays);
                        }}
                        className="input-base"
                        placeholder="Description"
                        rows={3}
                      />

                      <input
                        type="text"
                        value={stay.amenities.join(", ")}
                        onChange={(e) => {
                          const newStays = [...packageDetails.stays];
                          newStays[stayIndex].amenities = e.target.value.split(",").map(item => item.trim());
                          updatePackageDetails('stays', newStays);
                        }}
                        className="input-base"
                        placeholder="Add Amenities (separated by commas)"
                      />

                      <div className="flex flex-wrap gap-2">
                        {stay.amenities.map((amenity, amenityIndex) => (
                          <div
                            key={amenityIndex}
                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                          >
                            <span>{amenity}</span>
                            <button
                              onClick={() => {
                                const newStays = [...packageDetails.stays];
                                newStays[stayIndex].amenities = stay.amenities.filter((_, i) => i !== amenityIndex);
                                updatePackageDetails('stays', newStays);
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${currentStep === 1
              ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
              } else {
                if (isEditMode) {
                  handleUpdatePackage();
                } else {
                  handleCreatePackage();
                }
              }
            }}
            className="px-6 py-2 bg-blue-500 !text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200"
          >
            {currentStep === steps.length ?
              (isEditMode ? 'Update Package' : 'Create Package') : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrUpdatePackage;