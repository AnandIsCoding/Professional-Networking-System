import React from 'react';
import { FaCamera } from 'react-icons/fa';

function Banner({ banner }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    // Add upload logic here
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
    // Add submit logic here
  };

  return (
    <div className="relative w-full pt-8 pb-12 flex flex-col items-center">
      {/* Banner Image Section */}
      {banner === 1 ? (
        <div className="w-full h-[30vh] md:h-[35vh] bg-gray-200 rounded-md overflow-hidden relative mb-8">
          <img
            src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=1200"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          {/* Camera icon */}
          <label className="absolute top-3 right-3 bg-white hover:bg-gray-100 rounded-full p-2 shadow cursor-pointer transition-all">
            <FaCamera className="text-gray-600 text-xl" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
      <div className="flex flex-col items-center mb-8">
  {/* Container to avoid icon being hidden */}
  <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white bg-white">
    <img
      src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg"
      alt="Profile"
      className="w-full h-full object-cover rounded-full"
    />

    {/* Move label outside overflow-hidden area */}
    <label className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-white hover:bg-gray-100 rounded-full p-2 shadow cursor-pointer transition-all">
      <FaCamera className="text-gray-600 text-xl" />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  </div>
</div>

      )}

      {/* Submit/Update Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all shadow"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default Banner;
