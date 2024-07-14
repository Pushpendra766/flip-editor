import { useRef } from "react";
import VideoControls from "./VideoControls";
import CropPreview from "./CropPreview";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="p-20 flex">
      <div className="w-1/2">
        <video
          id="player"
          src="https://asset.cloudinary.com/dvotsqybi/3a3e3dcd540266ae18b2952e075ea77c"
          ref={videoRef}
          className="rounded-lg"
        />
        <VideoControls videoRef={videoRef} />
      </div>
      <div>
        <CropPreview />
      </div>
    </div>
  );
};

export default Video;
