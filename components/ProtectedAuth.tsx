'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if(isAuthenticated && (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/'))){
        router.replace('/dashboard'); // Redirect guests trying to access dashboard
    }else{
        router.replace('/');
    }
    // if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    //   router.replace('/'); // Redirect guests trying to access dashboard
    // }
    // if (isAuthenticated && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
    //   router.push('/dashboard'); // Redirect logged-in users away from auth pages
    // }

  }, [isAuthenticated, router, pathname]);
  
  return <>{children}</>;
};

export default ProtectedAuth;
