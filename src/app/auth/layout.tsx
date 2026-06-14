'use client';

import React from 'react';
import Image from 'next/image';

import AuthBoxWrapper from './style';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="p-16 relative">
      <div className="flex flex-col items-center">
        <Image src="/images/unipark.jpg" alt="Doamins.co.uk" loading="lazy" width={200} height={30} className="mb-12" />
        <AuthBoxWrapper>{children}</AuthBoxWrapper>
      </div>
      <div className="absolute right-0 top-[25%] auth-side-img">
        <Image src="/images/auth-side-img.svg" alt="auth" loading="lazy" width={390} height={390} />
      </div>
    </div>
  );
};

export default AuthLayout;
