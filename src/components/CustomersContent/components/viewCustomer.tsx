'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedCustomer } from '@/store/slices/customerSlice';
import Input from '@/components/UiComponents/Input';
import Button from '@/components/UiComponents/Button';


import { useGetCustomerById, useUpdateUserById } from '@/hooks/useCustomers';
import Spinner from '@/components/UiComponents/Spinner';

import NoResult from '@/components/UiComponents/NoResult';

import CustomersWrapper from '../style';
import RenderIf from '@/components/Common/renderIf';
import RenderSelect from '@/components/UiComponents/renderSelect';
import { showDataToast, showErrorToast } from '@/utils/common';

type UserInfoItem = {
  label?: string;
  value?: any;
  type?: string;
  componentData?: React.ComponentProps<typeof Input>;
  componentSelectData?: React.ComponentProps<typeof RenderSelect>;
};

const managementRoles = [
  { label: 'Admin', value: 'SystemAdministrator' },
  { label: 'Permits Operator', value: 'PermitsOperator' },
];

const userRoles = [
  { label: 'On Campus User', value: 'OnCampusUser' },
  { label: 'Off Campus User', value: 'OffCampusUser' },
  { label: 'School Vehicle Officials', value: 'SchoolVehicleOfficials' },
];

const statusOpts = [
  { label: 'Active', value: 'Active' },
  { label: 'InActive', value: 'InActive' },
];

const employmentStatusOpts = [
  { label: 'True', value: 'true' },
  { label: 'False', value: 'false' },
];


const ViewCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isPending } = useGetCustomerById(Number(id));
  const { mutate: updateUser, isPending: updatePending } = useUpdateUserById(Number(id));


  let customerData = data?.data;
  const [ fullName, setFullName ] = useState(customerData?.fullName);
  const [ maxVehicles, setMaxVehicles ] = useState(customerData?.maxVehicles);
  const [ role, setRole ] = useState(customerData?.role);
  const [ status, setStatus ] = useState(customerData?.status);
  const [ employmentStatus, setEmploymentStatus ] = useState<boolean>(customerData?.employmentStatus);

  const getAllowedRoles = () => (managementRoles.some(item => item.value === customerData?.role) ? managementRoles : userRoles.some(item => item.value === customerData?.role) ? userRoles : []);

  const handleUpdateUser = () => {
    const payload = {
      fullName: fullName,
      role: role,
      status: status,
      employmentStatus: employmentStatus,
      maxVehicles: Number(maxVehicles),
    };

    updateUser(payload, {
      onSuccess: () => {
        customerData = { ...customerData, ...payload };
        showDataToast('Rules Updated Successfully');
      },
      onError: (error: any) => {
        showErrorToast((error?.response?.data as any)?.error);
      },
    });
  };

  useEffect(() => {
    if (data?.data?.data) {
      dispatch(setSelectedCustomer(data.data.data));
    }
  }, [ data, dispatch ]);

  const reset = () => {
    setFullName(customerData?.fullName);
    setMaxVehicles(customerData?.maxVehicles);
    setRole(customerData?.role);
    setStatus(customerData?.status);
    setEmploymentStatus(customerData?.employmentStatus);
  };


  useEffect(() => reset(), [ customerData ]);

  const customerInfoLeft: UserInfoItem[] = [
    { label: 'User Id', value: customerData?.userId },
    customerData?.wxOpenId ? { label: 'wxOpenId', value: customerData?.wxOpenId } : {},
    { label: 'Email', value: customerData?.email },
    {
      label: 'Full Name',
      value: customerData?.fullName,
      componentData: {
        type: 'text',
        className: '!w-[281px] !h-9.5 !pl-8',
        symbolPosition: '!top-[9px]',
        name: 'Name',
        value: fullName || '',
        placeholder: 'Enter Full Name',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value),
      },
    },
  ];
  const customerInfoRight: UserInfoItem[] = [
    {
      label: 'Role',
      value: customerData?.role,
      componentSelectData: {
        value: role,
        onChange: val => setRole(val),
        options: getAllowedRoles(),
        placeholder: 'Select user role',
      },
    },
    {
      label: 'Status',
      value: customerData?.status,
      componentSelectData: {
        value: status,
        onChange: val => setStatus(val),
        options: statusOpts,
        placeholder: 'Select user status',
      },
    },
    {
      label: 'Employment Status',
      value: customerData?.employmentStatus || '-',
      componentSelectData: {
        value: employmentStatus ? 'true' : 'false',
        onChange: val => setEmploymentStatus(val === 'true'),
        options: employmentStatusOpts,
        placeholder: 'Select user employment status',
      },
    },
    {
      label: 'Max Vehicles',
      value: customerData?.maxVehicles,
      componentData: {
        type: 'number',
        className: '!w-[281px] !h-9.5 !pl-8',
        symbolPosition: '!top-[9px]',
        name: 'maxVehicles',
        value: maxVehicles || '',
        placeholder: 'Enter Max Vehicles',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMaxVehicles(e.target.value),
      },
    },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!customerData || customerData?.userId !== Number(id)) {
    return <NoResult title="Customer not found" description="The customer you are looking for does not exist." height="h-[calc(100vh-10rem)]" />;
  }

  return (
    <CustomersWrapper>
      <div className="flex flex-col md:flex-row items-start gap-8 p-6 customer-info">
        <div className="flex flex-col items-start gap-6 flex-1">
          {customerInfoLeft.map((item, index) => (
            <RenderIf isTrue={Boolean(item.label)} key={index}>
              <div className="flex items-center gap-4 h-8 w-full info-content">
                <span className="w-[200px] info-label">{item.label}</span>
                {item.componentData ? (
                  <div>
                    <Input {...item.componentData} />
                  </div>
                ) : (
                  <span className="info-value">{item.value}</span>
                )}
              </div>
            </RenderIf>
          ))}
        </div>
        <div className="flex flex-col items-start gap-6 flex-1">
          {customerInfoRight.map((item, index) => (
            <div key={index} className="flex items-center gap-4 h-8 w-full info-content">
              <span className="w-[200px] info-label">{item.label}</span>
              {item.componentData ? (
                <div>
                  <Input {...item.componentData} />
                </div>
              ) : item.componentSelectData ? (
                <div>
                  <RenderSelect {...item.componentSelectData} />
                </div>
              ) : (
                <span className="info-value">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 bottom-btns">
        <Button text="Cancel" className="outlined" disabled={updatePending} onClick={reset} />
        <Button text="Update" onClick={handleUpdateUser} isLoading={updatePending} />
      </div>
    </CustomersWrapper>
  );
};

export default ViewCustomer;
