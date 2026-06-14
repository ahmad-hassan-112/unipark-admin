'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AUTH_ROUTES } from '@/constants';
import { ROUTES } from '@/constants/pathName';
import Spinner from '@/components/UiComponents/Spinner';
import { useGetUser } from '@/hooks/useAuth';
import { setUser } from '@/store/slices/userSlice';

export default function ProtectedRoute ({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: userData, isPending, isAuthenticated } = useGetUser();
  const [ hasCheckedAuth, setHasCheckedAuth ] = useState(false);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [ userData, dispatch ]);

  const isAuthRoute = AUTH_ROUTES.some(route => pathname.includes(route));

  useEffect(() => {
    if (isPending) {
      setHasCheckedAuth(false);
      return;
    }

    if (isAuthRoute) {
      if (isAuthenticated) {
        router.replace('/');
      } else {
        setHasCheckedAuth(true);
      }
    } else {
      if (!isAuthenticated) {
        router.replace(ROUTES.SIGN_IN);
      } else {
        setHasCheckedAuth(true);
      }
    }
  }, [ isPending, isAuthenticated, isAuthRoute, router ]);

  if (isPending || !hasCheckedAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
