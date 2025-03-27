
export const FeatureCard = ({ title, icon }) => {
  return (
    <div className="animate-moveingBorder w-full max-w-[250px] h-[180px] sm:w-[220px] sm:h-[160px] bg-green-100 flex justify-center items-center flex-col gap-3 p-4 rounded-lg shadow-md ">
      <img
        src={icon}
        alt="icon"
        className="w-12 h-12 opacity-70"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(22%) sepia(15%) saturate(1525%) hue-rotate(110deg) brightness(95%) contrast(92%)",
        }}
      />
      <h3 className="text-lg sm:text-xl text-[#2E5B41] opacity-70 font-[Fira Sans Condensed] font-bold text-center">
        {title}
      </h3>
    </div>
  );
};
