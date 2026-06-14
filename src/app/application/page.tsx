import React, { Suspense } from 'react';
import ApplicationContent from '@/components/ApplicationContent';
import Spinner from '@/components/UiComponents/Spinner';
const Application = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    >
      <ApplicationContent />
    </Suspense>
  );
};

export default Application;
