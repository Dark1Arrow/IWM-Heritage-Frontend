import Icon from "./IconBtn";

const ConfirmationModal = ({ modelData }) => {
  // Early return if no data to prevent layout shift
  if (!modelData) return null;

  return (
    <div className="fixed inset-0 z- !mt-0 grid place-items-center overflow-auto bg-black/60 backdrop-blur-[4px] transition-all duration-300">
      {/* Modal Card */}
      <div className="w-11/12 max-w-[380px] rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
        
        {/* Title */}
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {modelData?.text1}
        </h2>
        
        {/* Description */}
        <p className="mt-4 mb-8 text-[15px] leading-relaxed text-gray-400">
          {modelData?.text2}
        </p>

        {/* Action Group */}
        <div className="flex flex-row-reverse items-center justify-start gap-x-3">
          {/* Main Action - Using your Icon Component */}
          <Icon
            onClick={modelData?.btn1Handler}
            text={modelData?.btn1Text}
            customClasses="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-xl font-bold transition-transform active:scale-95"
          />
          
          {/* Secondary/Cancel Action */}
          <button 
            className="rounded-xl bg-gray-800 px-6 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:bg-gray-700 hover:text-white active:scale-95"
            onClick={modelData?.btn2Handler}
          >
            {modelData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;