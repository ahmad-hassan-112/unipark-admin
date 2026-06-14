'use client';

import React from 'react';


import CustomersTable from './components/customersTable';
import ContentFilters from '@/components/UiComponents/ContentFilters';
import { useGetCustomers } from '@/hooks/useCustomers';

import CustomersWrapper from './style';

const CustomersContent = () => {
  const { data, isPending } = useGetCustomers();
  const customersData = data?.data;

  return (
    <CustomersWrapper>
      <div className="mb-4">
        <ContentFilters page="users" />
      </div>
      <CustomersTable customersMeta={customersData} customersData={customersData ?? []} isPending={isPending} />
    </CustomersWrapper>
  );
};

export default CustomersContent;
