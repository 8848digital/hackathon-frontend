'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../public/assets/8848_Logo.svg';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, currentUser } = useAuth()
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 shadow-lg relative">
        <div className="flex justify-between items-center h-16">
          <Image src={logo} width={64} height={64} alt="logo" />

          {/* Desktop Menu */}
          {!isAuthenticated && <> <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]" onClick={() => router.push('/login')}>
              <CiLogin className="mr-2" />
              Login
            </Button>
            <Button variant="default" className="bg-[#10635a] hover:bg-[#0d5048]" onClick={() => router.push('/register')}>
              <AiOutlineUser className="mr-2" />
              Register
            </Button>
          </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-white hover:bg-gray-800 transition">
                {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div> </>}
          {isAuthenticated && <Popover>
            <PopoverTrigger asChild><Button className=''>{currentUser?.split('')[0]}</Button></PopoverTrigger>
            <PopoverContent className="w-80" side='bottom' align='end'>
                <p>Hi, {currentUser}</p>
                
                <Button onClick={logout} className='w-full'>  Logout</Button>
            </PopoverContent>
          </Popover>}
        </div>

        {isOpen && (
          <div className="absolute top-16 right-5 w-[200px] md:hidden bg-black shadow-lg z-50 rounded-lg border border-gray-700">
            <div className="px-4 py-3 space-y-2">
              <Button
                variant="ghost"
                className="w-full text-left text-white hover:bg-gray-800"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                variant="default"
                className="w-full bg-[#10635a] hover:bg-[#0d5048]"
                onClick={() => router.push('/register')}
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

