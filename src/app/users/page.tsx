import React, { Suspense } from 'react';
import CustomersContent from '@/components/CustomersContent';
import Spinner from '@/components/UiComponents/Spinner';
const Customers = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    >
      <CustomersContent />
    </Suspense>
  );
};

export default Customers;
