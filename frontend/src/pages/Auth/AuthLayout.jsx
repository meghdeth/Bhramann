import React from 'react';
import { Link } from 'react-router-dom';

function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  alternateLink, 
  alternateLinkText, 
  overlayTitle, 
  overlayText 
}) {
  return (
    <div className="relative min-h-screen w-full md:flex flex-row">
      <Link to={"/"} className='absolute top-5 left-15 z-15 text-black md:!text-white text-3xl'>
        Bhramann
      </Link>
      {/* Left Side - Image */}
      <div 
        className="hidden md:block md:w-1/2 md:h-screen bg-cover bg-center relative w-full h-[30vh]"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1596394516093-501ba68a0ba6)',
        }}
      >

        {/* Overlay Text */}
        <div className="absolute inset-0 md:left-50 left-15 flex flex-col justify-center z-10">
          <h2 className="md:text-[4.5rem] font-bold text-white mb-6 text-[3rem]">
            {overlayTitle}
          </h2>
          <p className="md:text-[1.8rem] text-white/90 max-w-[500px] text-[1.6rem]">
            {overlayText}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 min-h-screen flex flex-col items-center justify-center !px-10 bg-[#f8f9fa] w-full">
          <div className="!mt-8 text-right w-full">
            <Link 
              to={alternateLink}
              className="flex align-center justify-end text-[1.4rem] text-gray-600 hover:!text-gray-800 transition-colors duration-300"
            >
              {alternateLinkText}
            </Link>
          </div>
        <div className="w-full max-w-[450px]">
          <h1 className="md:text-[4rem] font-bold text-[3rem]">
            {title}
          </h1>
          <p className="text-[1.6rem] text-gray-600 !mb-12">
            {subtitle}
          </p>

          {children}

        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
