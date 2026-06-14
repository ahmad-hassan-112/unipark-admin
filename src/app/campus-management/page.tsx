import React, { Suspense } from 'react';
import CampusContent from '@/components/CampusContent';
import Spinner from '@/components/UiComponents/Spinner';

const CampusManagement = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    >
      <CampusContent />
    </Suspense>
  );
};

export default CampusManagement;
