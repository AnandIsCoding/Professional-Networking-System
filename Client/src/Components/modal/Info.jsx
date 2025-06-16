import React from 'react';

function Info() {
    const handleUpdateInfo = async(event) =>{
        event.preventDefault()
    }
  return (
    <div className="max-full mx-auto md:p-4 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Profile Info</h2>

      <form onSubmit={handleUpdateInfo} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Anand Jha"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input
            type="text"
            placeholder="e.g. MERN Stack Developer | Open Source Contributor"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Current Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
          <input
            type="text"
            placeholder="e.g. TCS"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Current Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
          <input
            type="text"
            placeholder="e.g. Patna, Bihar"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
}

export default Info;
