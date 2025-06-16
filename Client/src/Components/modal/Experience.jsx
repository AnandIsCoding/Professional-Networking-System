import React from 'react';

function Experience() {
  const handleExperienceSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Experience submitted");
  };

  return (
    <div className="max-full mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Experience</h2>

      <form onSubmit={handleExperienceSubmit} className="space-y-5">
        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            placeholder="e.g. Google, Microsoft"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            placeholder="e.g. Jan 2023 - Present"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. Bengaluru, India"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Add Experience
          </button>
        </div>
      </form>
    </div>
  );
}

export default Experience;
