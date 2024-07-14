import { useEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";
import CropPreviewPlaceholder from "./CropPreviewPlaceholder";

interface CropRatio {
  width: number;
  height: number;
}

const Video = ({ isCropper }: { isCropper: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const croppedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cropRatio, setCropRatio] = useState<string>("9:16");

  useEffect(() => {
    const drawFrame = () => {
      if (videoRef.current && croppedCanvasRef.current) {
        const fullVideo = videoRef.current;
        const canvas = croppedCanvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const { videoHeight } = fullVideo;

          const cropRatioWidth = Number(cropRatio.split(":")[0]);
          const cropRatioHeight = Number(cropRatio.split(":")[1]);

          const cropWidth = (videoHeight * cropRatioWidth) / cropRatioHeight;
          const cropHeight = videoHeight;

          canvas.width = cropWidth;
          canvas.height = cropHeight;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(
            fullVideo,
            0,
            0,
            cropWidth,
            cropHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
      }
    };

    const handleSync = () => {
      if (videoRef.current) {
        const fullVideo = videoRef.current;
        if (fullVideo.paused) {
          clearInterval(interval);
        } else {
          drawFrame();
          interval = setInterval(drawFrame, 1000 / 30); // 30 FPS
        }
      }
    };

    let interval: ReturnType<typeof setInterval>;

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("play", handleSync);
      videoElement.addEventListener("pause", handleSync);
      videoElement.addEventListener("seeked", drawFrame);

      return () => {
        clearInterval(interval);
        videoElement.removeEventListener("play", handleSync);
        videoElement.removeEventListener("pause", handleSync);
        videoElement.removeEventListener("seeked", drawFrame);
      };
    }
  }, [cropRatio]);

  // useEffect(() => {
  //   if (videoRef.current?.width) {
  //     setCropRatio({
  //       width: videoRef.current.width,
  //       height: videoRef.current.height,
  //     });
  //   }
  // }, [videoRef]);

  return (
    <div className="p-20 flex gap-3">
      <div className="w-1/2">
        <video
          id="player"
          src="./src/assets/football.mp4"
          ref={videoRef}
          className="rounded-lg"
        />
        <VideoControls
          videoRef={videoRef}
          cropRatio={cropRatio}
          setCropRatio={(val: string) => {
            setCropRatio(val);
          }}
        />
      </div>
      <div className="w-1/2 -mt-6">
        <p className="text-center text-[#636469]">Preview</p>
        {isCropper ? (
          <div className="flex justify-center">
            <canvas ref={croppedCanvasRef} className="rounded-lg h-80"></canvas>
          </div>
        ) : (
          <CropPreviewPlaceholder />
        )}
      </div>
    </div>
  );
};

export default Video;
