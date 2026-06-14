import React from 'react';
import { mdiPencilOutline } from '@mdi/js';

import Button from '@/components/UiComponents/Button';
import Input from '@/components/UiComponents/Input';

type RuleInformationProps = {
  ruleData: any;
  visitorRatePer15min: number;
  setVisitorRatePer15min: (visitorRatePer15min: number) => void;
  nightPassPrice: number;
  setNightPassPrice: (nightPassPrice: number) => void;
  dayPassPrice: number;
  setDayPassPrice: (dayPassPrice: number) => void;
};

const RuleInformation = ({ ruleData, visitorRatePer15min, setVisitorRatePer15min, nightPassPrice, setNightPassPrice, dayPassPrice, setDayPassPrice }: RuleInformationProps) => {
  const ruleInfoLeft = [
    { label: 'Rule ID', value: ruleData.ruleId },
    { label: 'Campus name', value: ruleData?.campus?.name },
    { label: 'Campus Location', value: ruleData?.campus?.location ?? '-' },
  ];

  const ruleInfoRight = [
    {
      label: 'Visitor Rate Per 15min',
      value: ruleData.visitorRatePer15min,
    },
    {
      label: 'Day Pass Price',
      value: ruleData.dayPassPrice,
    },
    {
      label: 'Night Pass Price',
      value: ruleData.nightPassPrice,
    },
  ];

  const handleChange = (val: any, changeFunction: any) => {
    changeFunction(Number(val));
  };

  return (
    <div className="w-full rule-info-box">
      <div className="p-6 info-header">
        <h6 className=" text-black">Rule information</h6>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-8 p-6">
        <div className="flex flex-col items-start gap-6 flex-1">
          {ruleInfoLeft.map((item, index) => (
            <div key={index} className="flex items-center gap-4 h-8 w-full info-content">
              <span className="w-[200px] info-label">{item.label}</span>
              <span className="info-value">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-6 flex-1">
          {ruleInfoRight.map((item, index) => (
            <div key={index} className="flex items-center gap-4 w-full info-content">
              <span className="w-[200px] info-label">{item.label}</span>

              {Array.isArray(item.value) && (
                <div className="inline-flex items-center gap-2">
                  {item.value.map((server, idx) => (
                    <div key={idx} className="name-servers px-4 py-2">
                      <span>{server}</span>
                    </div>
                  ))}
                  <Button text="Edit" arrowLeft={true} iconLeft={mdiPencilOutline} className="!w-19.5 !h-[37px] !py-2.5 !px-4" />
                </div>
              )}

              {item.label === 'Visitor Rate Per 15min' && (
                <div>
                  <Input
                    type="number"
                    className="!w-[281px] !h-9.5 !pl-8"
                    symbolPosition="!top-[9px]"
                    name="price"
                    value={visitorRatePer15min || ''}
                    placeholder="Enter Visitor Rate Per 15min"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setVisitorRatePer15min)}
                  />
                </div>
              )}
              {item.label === 'Day Pass Price' && (
                <div>
                  <Input
                    type="number"
                    className="!w-[281px] !h-9.5 !pl-8"
                    symbolPosition="!top-[9px]"
                    name="price"
                    value={dayPassPrice || ''}
                    placeholder="Enter Day Pass Price"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setDayPassPrice)}
                  />
                </div>
              )}
              {item.label === 'Night Pass Price' && (
                <div>
                  <Input
                    type="number"
                    className="!w-[281px] !h-9.5 !pl-8"
                    symbolPosition="!top-[9px]"
                    name="price"
                    value={nightPassPrice || ''}
                    placeholder="Enter Night Pass Price"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, setNightPassPrice)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RuleInformation;
