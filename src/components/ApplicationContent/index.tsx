'use client';

import React from 'react';

import ApplicationTable from './components/applicationTable';
import ContentFilters from '@/components/UiComponents/ContentFilters';
import { useGetApplication } from '@/hooks/useApplication';

const ApplicationContent = () => {

  const { data, isPending } = useGetApplication();

  console.log('🚀 ~ ApplicationContent ~ data:', data);
  const applicationData = data?.data;

  console.log('🚀 ~ ApplicationContent ~ applicationData:', applicationData);

  return (
    <div>
      <div className="mb-4">
        <ContentFilters />
      </div>
      <ApplicationTable applicationData={applicationData} isPending={isPending} />
    </div>
  );
};

export default ApplicationContent;
