import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CardStack } from './ui/card-stack'

const HeroSection = () => {
    
  return (
    <>
    {/* <BackgroundBeamsWithCollision
          className={``}
        > */}
          <div className='relative min-h-[90vh] md:min-h-[80vh] w-full h-96 md:h-[40rem] bg-gradient-to-b from-white to-white dark:from-black dark:to-black flex items-center  justify-center overflow-hidden'>

         
          <div className="absolute h-52 w-52  lg:h-80 lg:w-80 bg-gradient-to-r from-pink-400 to-violet-500 rounded-full z-10 blur-[110px]"></div>
          <div className="md:flex w-full justify-evenly md:mx-20">
            <div className="w-full md:w-6/12   flex flex-col  items-center md:items-start mt-10 md:mt-0">
              <div className="inline-flex my-1 mx-auto md:mx-0 items-center gap-2 px-4 py-2  backdrop-blur-lg rounded-full border border-violet-100 dark:border-violet-800">
                <span className="text-violet-600 dark:text-violet-400">✨</span>
                <span className="text-gray-600 dark:text-gray-200">
                  Get personalized suggestions
                </span>
              </div>

              {/* <p className="text-gray-600 dark:text-gray-200"></p> */}
              <h2 className="text-2xl my-1 relative z-20 md:text-3xl  lg:text-4xl font-bold text-center md:text-left  text-black dark:text-white font-sans tracking-tight">
                Power Up Your Resume with <br />
                <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] my-1">
                  {/* <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">Career Forge AI</span>
              </div> */}
                  {/* <br/> */}
                  <div className="relative bg-clip-text md:text-5xl lg:text-7xl  text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 ">
                    <span className="">Career Forge AI</span>
                  </div>
                </div>
              </h2>
              {/* <Link
                href="/login"
                className="inline-block w-fit mx-auto md:mx-0 items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all duration-300"
              > */}
                <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 group">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              
            </div>
            <div className="w-full md:w-5/12 mt-24 md:mt-0 flex justify-center  ">
              <CardStack />
            </div>
          </div>
          </div>
        {/* </BackgroundBeamsWithCollision> */}
    </>
  )
}

export default HeroSection