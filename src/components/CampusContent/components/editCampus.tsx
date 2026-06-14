'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { difference, isEmpty, map } from 'lodash';

import { setSelectedCampus } from '@/store/slices/campusSlice';
import { clearSelectedCustomer } from '@/store/slices/customerSlice';


import CampusInformation from './campusInformation';

import Button from '@/components/UiComponents/Button';
import { useGetCampusById, useUpdateCampusById } from '@/hooks/useCampus';
import Spinner from '@/components/UiComponents/Spinner';

import NoResult from '@/components/UiComponents/NoResult';

import CampusContentWrapper from '../style';
import { showDataToast, showErrorToast } from '@/utils/common';




const EditCampus = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [ statsFilter, setStatsFilter ] = useState('24h');

  const { data, isPending } = useGetCampusById(id as string);

  const { mutate: updateCampus, isPending: updatePending } = useUpdateCampusById();

  const campusData = data?.data;

  const [ visitorRatePer15min, setVisitorRatePer15min ] = useState(campusData?.visitorRatePer15min);
  const [ dayPassPrice, setDayPassPrice ] = useState(campusData?.dayPassPrice);
  const [ nightPassPrice, setNightPassPrice ] = useState(campusData?.nightPassPrice);


  useEffect(() => {
    setVisitorRatePer15min(campusData?.visitorRatePer15min);
    setDayPassPrice(campusData?.dayPassPrice);
    setNightPassPrice(campusData?.nightPassPrice);
  }, [ campusData ]);

  useEffect(() => {
    dispatch(clearSelectedCustomer());
    dispatch(setSelectedCampus(campusData));
  }, [ campusData, dispatch ]);

  const handleUpdateCampus = () => {
    const payload = {
      id: campusData?.campus?.campusId,
      visitorRatePer15min: visitorRatePer15min,
      dayPassPrice: dayPassPrice,
      nightPassPrice: nightPassPrice,
    };

    updateCampus(payload, {
      onSuccess: () => {
        showDataToast('Rules Updated Successfully');
      },
      onError: (error: any) => {
        showErrorToast((error?.response?.data as any)?.error);
      },
    });
  };

  const isFormDataUnchanged = (price: number, categoryData: number[], campusData: any) => {
    const priceUnchanged = [ 'price' ].some(k => price === campusData?.[k]);

    const currentCategoryIds = map(campusData?.categories, 'id');
    const categoriesUnchanged = isEmpty(difference(categoryData, currentCategoryIds)) && isEmpty(difference(currentCategoryIds, categoryData));

    return priceUnchanged && categoriesUnchanged;
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  if (!campusData || campusData?.ruleId !== Number(id)) {
    return <NoResult title="Rules not found" height="h-[calc(100vh-10rem)]" />;
  }

  return (
    <CampusContentWrapper className="space-y-4">
      <CampusInformation
        ruleData={campusData}
        visitorRatePer15min={visitorRatePer15min}
        setVisitorRatePer15min={setVisitorRatePer15min}
        nightPassPrice={nightPassPrice}
        setNightPassPrice={setNightPassPrice}
        dayPassPrice={dayPassPrice}
        setDayPassPrice={setDayPassPrice}
      />

      <div className="flex justify-end gap-2 bottom-btns">
        <Button
          text="Cancel"
          className="outlined"
          onClick={() => {
            setVisitorRatePer15min(campusData?.visitorRatePer15min);
            setDayPassPrice(campusData?.dayPassPrice);
            setNightPassPrice(campusData?.nightPassPrice);
          }}
        />
        <Button text="Update" onClick={handleUpdateCampus} isLoading={updatePending} disabled={isFormDataUnchanged(123, [ 1 ], campusData)} />
      </div>
    </CampusContentWrapper>
  );
};

export default EditCampus;
