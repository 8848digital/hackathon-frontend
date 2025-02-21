'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '../public/assets/8848_logo.jpg';
import Image from 'next/image';
import { CiLogin } from 'react-icons/ci';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 bg-black shadow-lg relative">
      <div className="flex justify-between items-center h-16">
        <Image src={logo} width={64} height={64} alt="logo" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 text-white hover:text-gray-200 rounded-md hover:bg-gray-800 flex items-center transition"  onClick={handleLoginClick}>
            <CiLogin className="mr-2" />
            Login
          </button>
          <button className="px-4 py-2 text-white bg-[#10635a] rounded-md hover:bg-[#0d5048] flex items-center transition">
            <AiOutlineUser className="mr-2" />
            Register
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 transition"
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>
       {/* Modal */}
       {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} />
        )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-5 w-[200px] md:hidden bg-black shadow-lg z-50 rounded-lg border border-gray-700">
          <div className="px-4 py-3 space-y-2">
            <button className="block w-full text-left px-4 py-2 text-white rounded-md hover:bg-gray-800 transition"  onClick={handleLoginClick}>
              Login
            </button>
            <button className="block w-full text-left px-4 py-2 text-white bg-[#10635a] rounded-md hover:bg-[#0d5048] transition">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded-md shadow-md">
        {/* Your modal content here */}
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
    