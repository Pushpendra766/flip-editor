interface CropperProps {
  videoRef: any;
  cropRatio: string;
}

const Cropper = ({ videoRef, cropRatio }: CropperProps) => {
  const videoHeight = videoRef.current?.getBoundingClientRect().height;
  const videoWidth = videoRef.current?.getBoundingClientRect().width;
  const cropWidth = Number(cropRatio.split(":")[0]);
  const cropHeight = Number(cropRatio.split(":")[1]);
  const cropperWidth = (videoHeight * cropWidth) / cropHeight;
  const handleMouseDown = () => {};

  return (
    <div
      onMouseDown={handleMouseDown}
      className="absolute border-white w-10"
      style={{
        height: videoHeight,
        width: cropperWidth,
        cursor: "move",
        left: (videoWidth - cropperWidth) / 2,
      }}
    >
      <div className="cursor-move relative border h-full w-full bg-gray-400 bg-opacity-50">
        {[...Array(3)].map((_, row) =>
          [...Array(3)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="absolute"
              style={{
                top: `${(row / 3) * 100}%`,
                left: `${(col / 3) * 100}%`,
                width: "33.33%",
                height: "33.33%",
                border: "1px solid #ccc",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Cropper;
