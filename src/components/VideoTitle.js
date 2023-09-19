import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute text-white bg-gradient-to-r from-black">
      <div className="pt-48 px-6 font-bold text-3xl">{title}</div>
      <div className="pt-6 px-6 w-1/4">{overview}</div>
      <div className="py-4 px-6 md:m-0">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
