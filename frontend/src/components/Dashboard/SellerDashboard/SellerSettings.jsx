import React, { useState, useEffect } from "react";
import { User, Camera, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { updateProfile, changePassword, getProfile } from '../../../api';

export default function SellerSettings() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const { name = '', email = '', phone = '', bio = '' } = res.data || {};
        const [firstName, ...rest] = name.split(' ');
        const lastName = rest.join(' ');
        setUserProfile({
          firstName: firstName || '',
          lastName: lastName || '',
          email,
          phone: phone || '',
          bio: bio || '',
        });
      } catch (err) {
        alert("Failed to fetch user profile details.")
      }
    };
    fetchProfile();
  }, []);

  // Handler for profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    try {
      const name = `${userProfile.firstName} ${userProfile.lastName}`.trim();
      const { phone, bio } = userProfile;
      const res = await updateProfile({ name, phone, bio });
      setProfileMsg("Profile updated successfully!");
    } catch (err) {
      setProfileMsg(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Handler for password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    try {
      await changePassword({
        current: passwords.current,
        new: passwords.new,
        confirm: passwords.confirm,
      });
      setPasswordMsg("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      setPasswordMsg(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="space-y-10 p-6">
      {/* Profile Section */}
      <div className="bg-white rounded-2xl p-10 border border-slate-200">
        <h3 className="text-3xl font-semibold text-slate-900 mb-10">
          Profile Information
        </h3>

        <div className="flex items-center space-x-10 mb-10">
          <div className="relative">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-semibold text-slate-900">
              {userProfile.firstName} {userProfile.lastName}
            </h4>
            <p className="text-slate-600 text-lg">{userProfile.email}</p>
            <button className="!text-blue-600 hover:text-blue-700 text-lg font-medium mt-2">
              Change Profile Picture
            </button>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-medium text-slate-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={userProfile.firstName}
                onChange={(e) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="w-full px-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-slate-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={userProfile.lastName}
                onChange={(e) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="w-full px-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-slate-700 mb-2"
              >
                Email Address <span className="text-slate-500 text-md">(Read-only)</span>
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  readOnly
                  disabled
                  className="cursor-not-allowed w-full pl-14 pr-6 py-4 text-lg border border-slate-300 rounded-xl !bg-slate-100 text-slate-500 focus:outline-none"
                />
              </div>
            </div>


            <div>
              <label className="block text-lg font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) =>
                    setUserProfile((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full pl-14 pr-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <label className="block text-lg font-medium text-slate-700 mb-2">
              Bio
            </label>
            <textarea
              value={userProfile.bio}
              onChange={(e) =>
                setUserProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={4}
              className="w-full px-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {profileMsg && <div className="mt-4 text-blue-600 font-medium">{profileMsg}</div>}
          <button type="submit" className="mt-8 bg-blue-600 hover:bg-blue-700 !text-white font-semibold py-4 px-10 text-lg rounded-xl transition-colors duration-200">
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-2xl p-10 border border-slate-200">
        <h3 className="text-3xl font-semibold text-slate-900 mb-10">
          Change Password
        </h3>

        <form onSubmit={handlePasswordUpdate}>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-slate-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      current: e.target.value,
                    }))
                  }
                  className="w-full pl-14 pr-16 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6" />
                  ) : (
                    <Eye className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-slate-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      new: e.target.value,
                    }))
                  }
                  className="w-full pl-14 pr-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-slate-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirm: e.target.value,
                    }))
                  }
                  className="w-full pl-14 pr-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {passwordMsg && <div className="mt-4 text-blue-600 font-medium">{passwordMsg}</div>}
          <button type="submit" className="mt-10 bg-blue-600 hover:bg-blue-700 !text-white font-semibold py-4 px-10 text-lg rounded-xl transition-colors duration-200">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
