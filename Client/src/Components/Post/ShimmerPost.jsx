import React from "react";
import Card from "../Cards/Card";

function ShimmerPost() {
  return (
    <Card padding={0}>
      {/* Top user info */}
      <div className="px-8 py-4 flex gap-6 h-fit animate-pulse">
        <div className="h-14 w-14 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-2 justify-center">
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-40 h-3 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Description placeholder */}
      <div className="w-full px-8 py-2 text-gray-700 animate-pulse">
        <div className="w-full h-4 bg-gray-300 rounded mb-2" />
        <div className="w-[90%] h-4 bg-gray-300 rounded mb-2" />
        <div className="w-[80%] h-4 bg-gray-300 rounded mb-2" />
        <div className="w-[30%] h-4 bg-gray-300 rounded" />
      </div>

      {/* Image placeholder */}
      <div className="w-full h-[300px] bg-gray-300 animate-pulse" />

      {/* Like & comment count */}
      <div className="px-4 py-2 flex justify-between animate-pulse">
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-20 h-4 bg-gray-300 rounded" />
      </div>

      {/* Action buttons */}
      <div className="px-14 py-6 flex justify-between animate-pulse">
        <div className="w-20 h-6 bg-gray-300 rounded-full" />
        <div className="w-24 h-6 bg-gray-300 rounded-full" />
        <div className="w-20 h-6 bg-gray-300 rounded-full" />
      </div>
    </Card>
  );
}

export default ShimmerPost;
