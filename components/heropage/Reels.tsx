import React from "react";

const Reels = () => {
  return (
    <div className="my-16 max-w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5">
      <video
        className="aspect-[9/16] w-full rounded-xl"
        autoPlay
        loop
        muted
        preload="auto"
      >
        <source src="/photos/reel1.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Not Available
      </video>
      <video
        className="aspect-[9/16] w-full rounded-xl"
        autoPlay
        loop
        muted
        preload="auto"
      >
        <source src="/photos/reel2.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Not Available
      </video>
      {/* Add more videos as needed */}
    </div>
  );
};

export default Reels;
