import React from "react";

function UserContactsPanel() {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2 border-b-1 border-l-0 border-r-0 border-zinc-300 hover:bg-blue-50 p-2 cursor-pointer">
      {/* user's profile picture */}
      <img
        src="https://imgs.search.brave.com/m3AjEyYqrqs66D2V3HzEOVsAP9yRCKGsKsLCf-_NFgo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc"
        alt="user's_profile_image"
        className="h-14 w-14 rounded-full"
      />
      {/* user's name and occupation etc */}
      <div className="flex flex-col sm:pt-1 ">
        <h1>Sarang Tadaskar</h1>
        <p className="text-gray-600 text-sm">Btech Graduate</p>
      </div>
    </div>
  );
}

export default UserContactsPanel;
