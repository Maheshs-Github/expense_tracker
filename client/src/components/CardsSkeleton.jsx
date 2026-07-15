import React from "react";

const CardsSkeleton = () => {
  return (
    <div className="w-full h-[170px] animate-pulse border-gray-200 bg-white">
      <div className="w-full  p-5  flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <h2 className="h-[40px] w-[120px] flex gap-1 items-center  rounded-full p-2 bg-gray-200"></h2>
          <div className="w-10 h-7 bg-gray-200"></div>
        </div>
        <div className="w-30 h-7 bg-gray-200"></div>
        <div className="flex justify-between">
          <div className="w-14 h-7 bg-gray-200"></div>
          <button className="w-12 h-10  bg-gray-200"></button>
        </div>
      </div>
    </div>
  );
};

export default CardsSkeleton;
