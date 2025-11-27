'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/authService';

export default function AuthGuard({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (typeof window !== 'undefined' && !authService.isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
}