import React from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";
import {useState} from 'react';
import Menu from './components/menu';
import Navbar from './components/navbar';
import Carousel from './components/carousel';
import './App.css';

function App() {

  const [open, setOpen] = useState(true);

  return (
    <div className="App">
      <Navbar />
      <div className='flex flex-col'>
        <nav className='fixed'>
          <div className={`bg-[#2F4AA4] h-screen p-5 pt-8 
          ${open ? "w-72" : "w-20" } duration-300`}>
            <BsArrowLeftShort className={`bg-white text-black 
            text-3xl rounded-full absolute -right-3 top-9 border
            border-white cursor-pointer ${!open && "rotate-180"}`} onClick={() =>
              setOpen(!open)
            }/>
            <SiTailwindcss className={`text-4xl text-cyan-500 rounded cursor-pointer
            block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
            <h1 className={`text-white origin-left font-medium 
            text-2xl duration-300 mr-10 ${!open && "scale-0"}`}>Main Menu</h1>

            <Menu open={open} />
          </div>
        </nav>
        <div className={`p-5 h-screen bg-slate-400 flex-grow pb-16 ${open ? "ml-72" : "ml-20"}`}>
          <div className={'flex-1 h-100 flex flex-col justify-center items-center'}>
            <div className="lg:ml-16 lg:mr-16 sm:ml-4 sm:mr-4 sm:mt-8 sm:mb-8">
              <Carousel />
            </div>
          </div>
          <div className="flex-1 bg-pink-600 h-100 flex flex-col  justify-center items-center">
            <div className="flex lg:ml-16 lg:mr-16 sm:mt-8 sm:mb-8 lg:space-x-36">
              <div className="md:w-[160px] xl:w-[256px] flex-1 bg-lime-600 h-100 flex flex-col">
                <h1 className='text-lg font-semibold'>Content 2.1</h1>
              </div>
              <div className="md:w-[160px] xl:w-[256px] flex-1 bg-blue-600 h-100 flex flex-col">
                <h1 className='text-lg font-semibold'>Content 2.2</h1>
              </div>
              <div className="md:w-[160px] xl:w-[256px] flex-1 bg-purple-600 h-100 flex flex-col">
                <h1 className='text-lg font-semibold'>Content 2.3</h1>
              </div>
            </div>
          </div>

          <div className={`flex-1 bg-blue-500 h-100 flex flex-col`}>
            <h1 className='text-2xl font-semibold'>Content 3</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
