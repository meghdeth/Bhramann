import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Globe, Save, User } from 'lucide-react';
import Navbar from '../../Navbar/Navbar';

export default function EditProfile() {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9832098320',
        location: 'New York, USA',
        bio: 'Passionate traveler exploring the world one destination at a time.',
        website: 'www.johndoe.com'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle profile update
        console.log('Updated profile:', profileData);
    };

    const inputFields = [
        {
            id: 'name',
            label: 'Full Name',
            icon: <User className="input-icon" />,
            type: 'text',
        },
        {
            id: 'email',
            label: 'Email Address',
            icon: <Mail className="input-icon" />,
            type: 'email',
        },
        {
            id: 'phone',
            label: 'Phone Number',
            icon: <Phone className="input-icon" />,
            type: 'tel',
        },
        {
            id: 'location',
            label: 'Location',
            icon: <MapPin className="input-icon" />,
            type: 'text',
        }
    ];

    return (
        <>
        <Navbar isScrolled={true}/>
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-8 md:px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Edit Profile
                </h1>

                <div className="bg-white rounded-2xl shadow-md p-8 md:p-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-12">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-50"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-200">
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
                            {inputFields.map((field) => (
                                <div key={field.id}>
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            value={profileData[field.id]}
                                            onChange={(e) => setProfileData({ 
                                                ...profileData, 
                                                [field.id]: e.target.value 
                                            })}
                                            className="pl-12 input-base"
                                        />
                                        {field.icon}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                rows={4}
                                className="input-base"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    value={profileData.website}
                                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                    className="pl-12 input-base"
                                />
                                <Globe className="input-icon" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-500 !text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}