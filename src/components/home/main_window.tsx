import React from 'react';

const main_window: React.FC = () => {
  return (
    <main className="relative text-center px-8 py-16 min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-100 to-white">
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Let's Transform Every Day!</h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          TatvaCare is an innovative digital platform that empowers healthcare professionals and individuals with chronic conditions to build sustainable habits, driving positive health outcomes.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-center">
          <button className="bg-purple-600 text-white py-3 px-6 rounded-lg cursor-pointer text-base hover:bg-purple-700">
            For Individuals
          </button>
          <button className="bg-purple-600 text-white py-3 px-6 rounded-lg cursor-pointer text-base hover:bg-purple-700">
            For Healthcare Professionals
          </button>
        </div>
      </div>
      {/* Placeholder for illustrations (replace with actual images or SVG) */}
      {/* <div className="absolute inset-0 w-full h-full opacity-50 pointer-events-none flex justify-center items-center">
        <img src="/doctor.png" alt="Doctor" className="h-48 md:h-64 absolute" />
        <img src="/patient.png" alt="Patient" className="h-48 md:h-64 absolute -left-20 top-10" />
        <img src="/phone.png" alt="Phone" className="h-48 md:h-64 absolute -right-20 top-20" />
        <img src="/butter-block.png" alt="Butter Block" className="h-48 md:h-32 absolute -bottom-10 right-10" />
      </div> */}
    </main>
  );
};

export default main_window;