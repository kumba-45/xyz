import React, { useEffect, useRef } from "react";

interface VideoPlayProps {
  url: string;
}

const VideoPlay: React.FC<VideoPlayProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.src = url;
      videoRef.current.volume = 0.7;
    }
  }, [url]);

  return (
    <>
      <div>
        <video
          id="videoElementId"
          controls
          autoPlay
          loop
          playsInline
          ref={videoRef}
          className="w-500 h-300"
        >
          <source src={url ? url : ""} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default VideoPlay;
