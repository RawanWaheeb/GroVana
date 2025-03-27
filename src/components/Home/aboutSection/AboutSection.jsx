export default function AboutSection() {
  return (
    <div className="w-full px-6 sm:px-10 md:px-16 py-10 mt-[9rem]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-10 sm:mb-16 font-[lora] text-[#142718]">
        About Us
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 justify-items-center">
        <div className="space-y-6 sm:space-y-8 max-w-full md:max-w-[600px]">
          <div>
            <span className="text-[#2E5B41] text-base sm:text-lg font-bold">
              Features
            </span>
            <h3 className="text-2xl sm:text-[32px] md:text-[40px] leading-[1.2] font-bold mt-3 mb-6 sm:mb-8 font-fira-sans-condensed">
              We are always working to provide you best of the features in all
              aspects.
            </h3>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-[#333333] font-[lora]">
            At GroVana, we blend nature with innovation and AI-powered tools to
            make plant care simple and enjoyable.
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-[#333333] font-[lora]">
            Whether you&apos;re new to gardening or an experienced grower, we
            offer quality plants, expert advice, and smart AI assistance to help
            you thrive.
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-[#333333] font-[lora]">
            Join us in creating a greener, more beautiful world, one plant at a
            time.
          </p>
        </div>

        <div className="relative lg:mt-8">
          <img
            src="/lovable-uploads/19fbc91e-831d-4a4e-95dd-6ef0e0a862d3.png"
            alt="GroVana Store Interior"
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px]"
          />
          <div className="absolute inset-0 w-full aspect-square bg-[#E7EFE4] -z-10 transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 top-[-50px] left-[-50px] sm:top-[-70px] sm:left-[-70px]" />
        </div>
      </div>
    </div>
  );
}
