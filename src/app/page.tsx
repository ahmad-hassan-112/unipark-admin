'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Image from 'next/image';

// import Spinner from '@/components/UiComponents/Spinner';
// import { calculateMaxValue, mapYearlyData } from '@/utils/common';

const Home = () => {
  const userData = useSelector((state: RootState) => state?.user?.data);

  return (
    <div>
      <h5 className="text-black mb-8">Good morning, {userData?.data?.fullName}</h5>
      <h6 className="text-black mb-8">Welcome to Unipark</h6>
      <div className='flex align-center justify-center'>
        <Image src="/images/unipark.jpg" alt="notification" loading="lazy" width={400} height={400} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Home;
