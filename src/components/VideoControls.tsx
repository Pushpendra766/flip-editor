import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Dropdown } from "flowbite-react";
import { CROP_RATIOS, PLAYBACK_SPEEDS } from "../constants/constants";

const VideoControls = ({ videoRef }: { videoRef: any }) => {
  const [volume, setVolume] = useState<number>(0.4);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [cropRatio, setCropRatio] = useState<string>("9:16");

  const videoLength = videoRef.current?.duration
    ? videoRef.current.duration
    : 0;

  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePauseAndPlay = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const newDuration = (value * videoLength) / 100;
    setCurrentTime(parseFloat(e.target.value));
    videoRef.current.currentTime = newDuration;
  };

  const handleMute = () => {
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setVolume(0.4);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    videoRef.current.volume = e.target.value;
    setVolume(Number(e.target.value));
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const getCurrentTimestamp = () => {
    const minutes = String(
      Math.floor((currentTime * videoLength) / 100 / 60)
    ).padStart(2, "0");
    const seconds = String(
      Math.floor(((currentTime * videoLength) / 100) % 60)
    ).padStart(2, "0");
    const totalMinutes = String(Math.floor(videoLength / 60)).padStart(2, "0");
    const totalSeconds = String(Math.floor(videoLength % 60)).padStart(2, "0");

    return `${minutes}:${seconds} | ${totalMinutes}:${totalSeconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const time = videoRef.current.currentTime;
      if (time) {
        setCurrentTime((videoRef.current.currentTime * 100) / videoLength);
      } else {
        setCurrentTime(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  useEffect(() => {
    videoRef.current.volume = volume;
  }, []);

  return (
    <div>
      <div className="py-4 flex gap-3 items-center">
        <button onClick={handlePauseAndPlay}>
          {isVideoPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <input
          type="range"
          value={currentTime}
          className="slider transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-[#65676b]"
          onChange={handleSeek}
          style={{ accentColor: "blue" }}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm">{getCurrentTimestamp()}</p>
        <div className="flex gap-2 items-center">
          <button onClick={handleMute}>
            {isMuted ? (
              <HiSpeakerXMark size={20} />
            ) : (
              <HiSpeakerWave size={20} />
            )}
          </button>
          <input
            type="range"
            className="slider transparent h-[4px] cursor-pointer appearance-none w-20 border-transparent bg-[#65676b]"
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
            style={{ accentColor: "blue" }}
            value={volume}
          />
        </div>
      </div>
      <div className="flex gap-3 py-4">
        <div className="border border-[#404248] p-2 rounded-lg">
          <Dropdown
            label={`Playback speed ${playbackSpeed}x`}
            className="bg-[#37393f] border-[#404248]"
          >
            {PLAYBACK_SPEEDS.map((speed) => (
              <Dropdown.Item
                onClick={() => handleSpeedChange(speed)}
                className="bg-[#37393f]  px-2 py-1 hover:bg-[#474a52]"
                key={speed}
              >
                {speed}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div className="border border-[#404248] p-2 w-fit rounded-lg">
          <Dropdown
            label={`Cropper aspect ratio ${cropRatio}`}
            className="bg-[#37393f] border-[#404248]"
          >
            {CROP_RATIOS.map((crop) => (
              <Dropdown.Item
                className="bg-[#37393f]  px-2 py-1 hover:bg-[#474a52]"
                key={crop}
                onClick={() => setCropRatio(crop)}
              >
                {crop}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
