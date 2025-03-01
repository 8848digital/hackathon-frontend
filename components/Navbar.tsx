'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../public/assets/8848_Logo.svg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { isAuthenticated, logout, currentUser } = useAuth()

  return (
    <div className="max-w-6xl mx-auto px-4 bg-black shadow-lg relative">
      <div className="flex justify-between items-center h-16">
        <Image src={logo} width={64} height={64} alt="logo" />

        {/* Desktop Menu */}
        {!isAuthenticated && <> <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-[#dcf7f1]" onClick={() => setIsModalOpen(true)}>
            <CiLogin className="mr-2" />
            Login
          </Button>
          <Button variant="default" className="bg-[#10635a] hover:bg-[#0d5048]" onClick={() => setIsRegisterOpen(true)}>
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
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false); 
              }}
            >
              Login
            </Button>
            <Button
              variant="default"
              className="w-full bg-[#10635a] hover:bg-[#0d5048]"
              onClick={() => {
                setIsRegisterOpen(true);
                setIsOpen(false); 
              }}
            >
              Register
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      {
        isAuthenticated ? <></> : <>
          <LoginDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setIsRegisterOpen={setIsRegisterOpen} />
          <RegisterDialog isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} setIsModalOpen={setIsModalOpen} />
        </>
      }
    </div>
  );
};

export default Navbar;

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, setIsRegisterOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login({ usr: email, pwd: password }).then(() => onClose())
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-white p-6 rounded-xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-2">
            <DialogTitle className="text-xl font-semibold">Welcome to Hackathon</DialogTitle>
            <DialogDescription className="text-gray-500 text-center">Sign in to continue</DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" className="w-full p-3 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" className="w-full p-3 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <a href="#" onClick={() => { setIsRegisterOpen(true); onClose() }} className="text-blue-500">
              Register
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setIsModalOpen: (value: boolean) => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ isOpen, onClose, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://hackathon.8848digitalerp.com/api/method/hackathon.API.register_api.register', {
        email: formData.email,
        pwd: formData.password,
        first_name: formData.name,
        role: formData.role,
      });

      if (response.status === 200) {
        onClose();
      } else {
       console.error(response);
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-white p-6 rounded-xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-2">
            <DialogTitle className="text-xl font-semibold">Welcome to Hackathon</DialogTitle>
            <DialogDescription className="text-gray-500 text-center">Register to create your first account</DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col gap-y-4 sm:flex-row sm:space-x-2 ">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="role"
              placeholder="Role"
              className="w-full p-3 border rounded-md"
              value={formData.role}
              onChange={handleChange}
              // required
            />
          </div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full bg-black text-white p-3 rounded-md" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <a
              href="#"
              onClick={() => {
                setIsModalOpen(true);
                onClose();
              }}
              className="text-blue-500"
            >
              Log In
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
