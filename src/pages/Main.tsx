import React from 'react'
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import NavBar from '../components/NavBar';

export const Main = () => {

      
  return (
    <>
        <NavBar />
        <div className="w-full z-50 px-6 bg-[#0f172a]">
        
        {/* Paso 1 */}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
            <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                <div className="max-w-xl mb-6">
                <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-6">
                    Lorem Ipsum Is Cool.
                </h2>
                <p className="text-white text-base md:text-lg">
                    Lorem Ipsum is so cool and awesome to act and so cool to think. And very awesome to eat and talk.
                </p>
                </div>
                <div className="flex items-center space-x-3">
                <Link
                    to="/comingsoon"
                    className="flex items-center text-white border-2 justify-center w-full sm:px-10 py-4 leading-6 bg-black rounded-lg font-black hover:bg-zinc-800 transition-colors"
                >
                    <img 
                    width="25" 
                    height="25" 
                    alt="google auth logo" 
                    src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20200429221626%21Google_%22G%22_Logo.svg" 
                    className="mr-2"
                    />
                    Get Started
                </Link>
                </div>
            </div>
            <img 
                alt="logo" 
                width={450} 
                height={450} 
                src="https://images.unsplash.com/photo-1542304074-9c8ce93b52fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" 
                className="rounded-2xl"
            />
            </div>
        </div>

        {/* Paso 2 */}
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
            <img 
                alt="logo" 
                width={450} 
                height={450} 
                src="https://images.unsplash.com/photo-1515023677547-593d7638cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" 
                className="rounded-2xl"
            />
            <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5 lg:ml-10">
                <div className="max-w-xl mb-6">
                <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-bold tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-6">
                    Step 2 : Awesome Is Lorem Ipsum
                </h2>
                <p className="text-white text-base md:text-lg">
                    Lorem Ipsum is so cool and awesome to act and so cool to think.
                </p>
                </div>
                <div className="flex items-center space-x-3">
                <Link
                    to="/comingsoon"
                    className="flex items-center text-white border-2 justify-center w-full sm:px-10 py-4 leading-6 bg-black rounded-lg font-black"
                >
                    <img alt="logo" width="25" src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20200429221626%21Google_%22G%22_Logo.svg" className="mr-2" />
                    Get Started
                </Link>
                </div>
            </div>
            </div>
        </div>

        {/* Sección Ayuda / Contacto */}
        <div className="sm:px-4 py-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded-3xl shadow-sm lg:flex-row sm:mx-auto">
            <div className="relative lg:w-1/2">
                <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="mobile app"
                className="object-cover w-full h-80 lg:h-full"
                />
            </div>
            <div className="flex flex-col justify-center p-8 bg-black lg:p-16 lg:pl-10 lg:w-1/2">
                <h5 className="mb-3 text-3xl text-white font-extrabold leading-none sm:text-4xl">
                Need Some Help!
                </h5>
                <div className="flex items-left mt-6">
                <Link
                    to="/contact"
                    className="flex hover:border-blue-400 hover:shadow-xl items-center text-white border-2 justify-center w-full sm:px-10 py-4 leading-6 bg-black rounded-lg font-black transition-all"
                >
                    <img 
                    width="25" 
                    alt="gmail logo" 
                    src="https://cdn.icon-icons.com/icons2/2170/PNG/512/google_logo_brand_social_icon_133256.png" 
                    className="mr-2"
                    />
                    Contact Us
                </Link>
                </div>
            </div>
            </div>
        </div>

        </div>
    </>
  );
};
