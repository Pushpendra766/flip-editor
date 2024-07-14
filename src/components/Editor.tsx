import Video from "./Video";

const Editor = () => {
  return (
    <div className="flex h-screen items-center text-white">
      <div className=" rounded-lg w-2/3 bg-[#37393f] mx-auto">
        <div className="flex justify-between p-4">
          <h1 className="text-lg">Cropper</h1>
          <div className="bg-[#45474e] px-2 py-1 flex gap-2 rounded-md text-sm">
            <button>Preview Session</button>
            <button className="bg-[#37393f] px-3 py-1 rounded-md">
              Generate Session
            </button>
          </div>
          <div></div>
        </div>
        <Video />
        <hr className="border-[#404249]" />
        <div className="flex justify-between p-4">
          <div className="flex gap-2">
            <button className="bg-[#7636d6] p-2 rounded-lg text-sm font-semibold">
              Start Cropper
            </button>
            <button className="bg-[#7636d6] p-2 rounded-lg text-sm font-semibold">
              Remove Cropper
            </button>
            <button
              className="bg-[#7636d6] p-2 rounded-lg text-sm font-semibold disabled:bg-[#59388a]"
              disabled
            >
              Generate Preview
            </button>
          </div>
          <div>
            <button className="bg-[#45474e] p-2 rounded-lg text-sm font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
