import { IoLogoYoutube } from "react-icons/io";

const CropPreviewPlaceholder = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-80 text-center gap-3">
        <IoLogoYoutube size={40} className="mx-auto" />
        <p className="text-center">Preview not available</p>
        <p className="text-[#636469]">
          Please click on "Start Cropper" <br /> and then play video
        </p>
      </div>
    </>
  );
};

export default CropPreviewPlaceholder;
