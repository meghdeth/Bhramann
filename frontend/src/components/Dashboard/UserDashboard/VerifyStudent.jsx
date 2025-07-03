import { useState } from "react";
import { X, Clock, Check, Upload } from "lucide-react";

export default function VerifyStudent() {
  const [studentData, setStudentData] = useState({
    status: "not_submitted", // "pending" | "verified" | "not_submitted"
    collegeEmail: "",
    idCardImage: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setStudentData(prev => ({ ...prev, idCardImage: file }));
    } else {
      alert("File must be under 10MB.");
    }
  };

  const handleStudentVerification = () => {
    // Simulate submission
    setStudentData(prev => ({ ...prev, status: "pending" }));
    // Simulate API call here...
    console.log("Submitted:", studentData);
  };


  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 border border-slate-200 w-full">
        <div className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Student Verification</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Verify your student status to get up to 20% discount on all travel packages
          </p>
        </div>

        <div className="pt-6 space-y-6">
          {studentData.status === "pending" && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
              <Clock className="w-6 h-6 text-amber-500" />
              <div>
                <p className="font-semibold text-amber-800">Verification in Progress</p>
                <p className="text-amber-600 text-sm">
                  We're reviewing your documents. This usually takes 1-2 business days.
                </p>
              </div>
            </div>
          )}

          {studentData.status === "verified" && (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Check className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold text-green-800">Verification Successful!</p>
                <p className="text-green-600 text-sm">
                  You're now eligible for student discounts on all packages.
                </p>
              </div>
            </div>
          )}

          {studentData.status === "not_submitted" && (
            <>
              <div>
                <label className="block text-lg font-medium text-slate-700 mb-2">
                  
                  College Email Address <span className="text-red-500">*</span> <span className="text-slate-500 text-md">(Must be a valid email address from your institution)</span>
                </label>
                <input
                  type="email"
                  value={studentData.collegeEmail}
                  onChange={(e) =>
                    setStudentData((prev) => ({
                      ...prev,
                      collegeEmail: e.target.value,
                    }))
                  }
                  placeholder="your.name@university.edu"
                  className="w-full px-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-slate-700 mb-2">
                  Student ID Card <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="id-card-upload"
                  />
                  <label htmlFor="id-card-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {studentData.idCardImage
                        ? studentData.idCardImage.name
                        : "Upload your student ID card"}
                    </p>
                    <p className="text-gray-500 text-lg">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-2xl">Requirements:</h3>
                <ul className="text-lg space-y-1 !list-decimal ">
                  <li className="ml-6">Valid college/university email address</li>
                  <li className="ml-6">Clear photo of current student ID card</li>
                  <li className="ml-6">ID must show your name, photo, and current academic year</li>
                  <li className="ml-6">Verification typically takes 1-2 business days</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button 
                onClick={handleStudentVerification}
                disabled={!studentData.collegeEmail || !studentData.idCardImage}
                type="submit" className="mt-8 bg-blue-600 hover:bg-blue-700 !text-white font-semibold py-4 px-10 text-lg rounded-xl transition-colors duration-200 disabled:bg-blue-400">
                  Submit for Verification
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
