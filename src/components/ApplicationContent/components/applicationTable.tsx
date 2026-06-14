'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UiComponents/Table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UiComponents/Popover';
import NoResult from '@/components/UiComponents/NoResult';

import Spinner from '@/components/UiComponents/Spinner';
import { ApplicationListingTableProps } from '@/types/applicationTypes';

const headerData = [ 'Application ID', 'Permit Type', 'Applicant Name', 'Applicant Email', 'Vehicle number', 'Vehicle Category', 'Is OfficialVehicle', 'submittedAt', '' ];

const ApplicationTable: React.FC<ApplicationListingTableProps> = ({ applicationData, isPending }) => {
  const router = useRouter();


  const popoverMenu = [
    {
      icon: <Eye size="16px" />,
      name: 'Review',
      onClick: (applicationId: number) => router.push(`/application/${applicationId}`),
    },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isPending && (applicationData?.length === 0 || !applicationData)) {
    return <NoResult height="h-[calc(100vh-250px)]" />;
  }

  return (
    <div className="table-border">
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            {headerData.map(item => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicationData?.map(item => (
            <TableRow key={item.applicationId}>
              <TableCell className="text-[var(--secondaryBase)] font-medium">{item.applicationId}</TableCell>
              <TableCell>{item.permitType}</TableCell>
              <TableCell>{item.applicant.fullName}</TableCell>
              <TableCell>{item.applicant.email}</TableCell>
              <TableCell>{item.vehicle.plateNumber || '-'}</TableCell>
              <TableCell>{item.vehicle.category || '-'}</TableCell>
              <TableCell>{item.vehicle.isOfficialVehicle ? 'True' : 'False'}</TableCell>
              <TableCell>{item.submittedAt}</TableCell>

              <TableCell className="flex justify-end">
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Image src="/icons/dots-vertical.svg" alt="menu" width={20} height={20} className="cursor-pointer max-w-auto" />
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="!w-35" side="right" align="start">
                    <div className="flex items-center gap-2 py-1.5">
                      <div className="popover-menu">
                        {popoverMenu.map(item1 => (
                          <div
                            className="flex items-center gap-2 px-4 py-1.5 text-sm cursor-pointer text-[var(--neutral850)] leading-[150%]"
                            key={item1.name}
                            onClick={() => item1.onClick(item.applicationId)}
                          >
                            {item1.icon}
                            <span>{item1.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
