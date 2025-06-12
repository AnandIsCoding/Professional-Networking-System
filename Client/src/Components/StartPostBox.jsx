import React from 'react';
import { MdPhotoLibrary, MdOndemandVideo, MdArticle } from 'react-icons/md';

const StartPostBox = () => {
  return (
    <div className="bg-white border border-zinc-300 p-4 rounded-md md:col-span-3 md:col-start-2 md:row-start-1">
      
      {/* Top: Avatar and Post Button */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://picsum.photos/40"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <button className="flex-grow md:font-bold text-left px-4 py-2 border border-zinc-300 rounded-full text-zinc-600 bg-zinc-100 hover:bg-zinc-100">
          Write a post
        </button>
      </div>

      {/* Bottom: Post Options */}
      <div className="flex justify-between text-sm text-zinc-600 md:px-14">
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
          <MdPhotoLibrary className="text-blue-500 text-xl" />
          <span>Photo</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-green-600">
          <MdOndemandVideo className="text-green-500 text-xl" />
          <span>Video</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-orange-600">
          <MdArticle className="text-orange-500 text-xl" />
          <span>Write article</span>
        </div>
      </div>
    </div>
  );
};

export default StartPostBox;
