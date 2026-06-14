'use client';

import React from 'react';

import CampusTable from './components/campusTable';
import CampusFilters from './components/campusFilters';
import { useGetCampus } from '@/hooks/useCampus';

import CampusContentWrapper from './style';

const CampusContent = () => {
  const { data, isPending } = useGetCampus();
  const campusData = data?.data;

  return (
    <CampusContentWrapper>
      <div className="mb-4">
        <CampusFilters />
      </div>
      <CampusTable campusData={campusData} isPending={isPending} />
    </CampusContentWrapper>
  );
};

export default CampusContent;
