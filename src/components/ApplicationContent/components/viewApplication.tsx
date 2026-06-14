'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedCustomer } from '@/store/slices/customerSlice';
import Button from '@/components/UiComponents/Button';
import { ToggleGroup, ToggleGroupItem } from '@/components/UiComponents/ToggleGroup';
import Input from '@/components/UiComponents/Input';
import Spinner from '@/components/UiComponents/Spinner';
import RenderIf from '@/components/Common/renderIf';
import NoResult from '@/components/UiComponents/NoResult';

import CustomersWrapper from '../../CustomersContent/style';
import { useGetApplicationById, useGetApplicationDocuments, useUpdateApplicationById } from '@/hooks/useApplication';
import ViewCustomersTable from '@/components/CustomersContent/components/viewCustomerTable';
import { showDataToast, showErrorToast } from '@/utils/common';

const toggleItems = [
  {
    name: 'Documents',
    value: 'documents',
  },
];

const ViewApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isPending } = useGetApplicationById(Number(id));
  const { data: docData, isPending: docPending } = useGetApplicationDocuments(Number(id));
  const { mutate: updateApplication, isPending: updatePending } = useUpdateApplicationById();

  const applicationData = data?.data;
  const enquiries = docData?.data;

  const [ rejectionReason, setRejectionReason ] = useState('');

  useEffect(() => {
    if (data?.data?.data) {
      dispatch(setSelectedCustomer(data.data.data));
    }
  }, [ data, dispatch ]);


  const customerInfoLeft = [
    { label: 'Name', value: applicationData?.applicant?.fullName || '-' },
    { label: 'Email', value: applicationData?.applicant?.email || '-' },
    { label: 'Role', value: applicationData?.applicant?.role || '-' },
    { label: 'Employment Status', value: applicationData?.applicant?.employmentStatus || '-' },
    { label: 'Max Vehicles', value: applicationData?.applicant?.maxVehicles || '-' },
    { label: 'Permit Type', value: applicationData?.permitType || '-' },
  ];
  const customerInfoRight = [
    { label: 'Status', value: applicationData?.status || '-' },
    applicationData?.rejectionReason ? { label: 'Rejection Reason', value: applicationData?.rejectionReason } : {},
    { label: 'Plate Number', value: applicationData?.vehicle?.plateNumber || '-' },
    { label: 'Category', value: applicationData?.vehicle?.category || '-' },
    { label: 'Is Official Vehicle', value: applicationData?.vehicle?.isOfficialVehicle ? 'True' : 'False' },
    { label: 'Submitted At', value: applicationData?.submittedAt || '-' },
  ];

  const handleUpdateApplication = (decision: string) => {
    const payload = {
      id: applicationData.applicationId,
      decision,
      rejectionReason,
    };

    if (decision === 'reject' && !rejectionReason) showErrorToast('Reject reason is required');

    updateApplication(payload, {
      onSuccess: () => {
        showDataToast(`Application Status ${decision}`);
      },
      onError: (error: any) => {
        showErrorToast( (error?.response?.data as any)?.error );
      },
    });
  };

  if (isPending || docPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!applicationData || applicationData?.applicationId !== Number(id)) {
    return <NoResult title="Customer not found" description="The customer you are looking for does not exist." height="h-[calc(100vh-10rem)]" />;
  }

  return (
    <CustomersWrapper>
      <div className="flex flex-col md:flex-row items-start gap-8 p-6 customer-info">
        <div className="flex flex-col items-start gap-6 flex-1">
          {customerInfoLeft.map((item, index) => (
            <RenderIf key={index} isTrue={Boolean(item?.label)}>
              <div className="flex items-center gap-4 h-8 w-full info-content">
                <span className="w-[200px] info-label">{item.label}</span>
                <span className="info-value">{item.value}</span>
              </div>
            </RenderIf>
          ))}
        </div>
        <div className="flex flex-col items-start gap-6 flex-1">
          {customerInfoRight.map((item, index) => (
            <RenderIf key={index} isTrue={Boolean(item?.label)}>
              <div className="flex items-center gap-4 h-8 w-full info-content">
                <span className="w-[200px] info-label">{item.label}</span>
                <span className="info-value">{item.value}</span>
              </div>
            </RenderIf>
          ))}
        </div>
      </div>
      <ToggleGroup type="single" defaultValue="documents" className="my-4">
        {toggleItems.map(item => (
          <ToggleGroupItem key={item.name} value={item.value}>
            <span>{item.name}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <RenderIf isTrue={enquiries?.length > 0} fallback={<NoResult height="h-[350px]" title="No Documents found" description="No Documents found for this application" />}>
        <ViewCustomersTable enquiries={enquiries} />
      </RenderIf>
      <div className="flex justify-end gap-2 bottom-btns">
        <Button text="Reject" className="outlined" isLoading={updatePending} onClick={() => handleUpdateApplication('reject')} />
        <Input
          type="Text"
          placeholder="Reject Reason"
          value={rejectionReason || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRejectionReason(e.target.value)}
          className="!w-[281px] !h-9.5 !pl-8"
        />
        <Button text="Approve" isLoading={updatePending} onClick={() => handleUpdateApplication('approve')} />
      </div>
    </CustomersWrapper>
  );
};

export default ViewApplication;
