const Loader: React.FC = () => {
  return (
    <div className="flex-1   flex justify-center items-center">
      <div className=" w-[100px] h-[100px] flex flex-col gap-2 items-center justify-center bg-[#212121] rounded-xl">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="relative w-10 h-10">
              <div
                className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>

              <div
                className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
                style={{
                  animationDuration: "2s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
          </div>
        </div>
        <div className="flex gap-1 text-white">
          <span className="text-base font-medium">loading</span>
          <span id="dot1" className="dot text-lg">
            .
          </span>
          <span id="dot2" className="dot text-lg">
            .
          </span>
          <span id="dot3" className="dot text-lg">
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
