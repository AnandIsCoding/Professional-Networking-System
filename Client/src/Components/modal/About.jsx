import React from 'react';

function About() {
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded resume:", file);
    // You can add logic to preview or upload the file here
  };
  const handleEditAbout = async(event) =>{
    event.preventDefault()
  }

  return (
    <div className="max-full mx-auto  ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit About Section</h2>

      <form onSubmit={handleEditAbout} className="space-y-5">
        {/* About You */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
          <textarea
            rows="5"
            placeholder="Write something about yourself..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills <span className="text-xs text-gray-500">(Add comma-separated)</span></label>
          <input
            type="text"
            placeholder="e.g. JavaScript, React, Node.js, MongoDB"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="w-full px-3 py-2 cursor-pointer border rounded-md shadow-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Update About
          </button>
        </div>
      </form>
    </div>
  );
}

export default About;
