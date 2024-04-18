import React from "react";

const DynamicVideo = ({ videoUrl }) => {
  return (
    <video preload="none" playsInline autoPlay loop muted>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default DynamicVideo;
