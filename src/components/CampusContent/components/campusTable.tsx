'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UiComponents/Table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UiComponents/Popover';
import NoResult from '@/components/UiComponents/NoResult';

import { CampusListingTableProps } from '@/types/campusTypes';
import Spinner from '@/components/UiComponents/Spinner';



const headerData = [ 'Campus Id', 'Campus name', 'Campus Location', '' ];

const CampusTable: React.FC<CampusListingTableProps> = ({ campusData, isPending }) => {
  const router = useRouter();


  const popoverMenu = () => [
    {
      icon: '/icons/edit-2.svg',
      name: 'Edit',
      onClick: (campusId: number) => router.push(`/campus-management/${campusId}`),
    },
  ];


  if (isPending)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (!isPending && (!campusData || campusData?.length === 0)) {
    return <NoResult height="h-[calc(100vh-200px)]" />;
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
          {campusData?.map(campus => (
            <TableRow key={campus.campusId}>
              <TableCell>{campus.campusId}</TableCell>
              <TableCell>{campus.name}</TableCell>
              {/* <TableCell>{formatDateOrDash(campus.expiry_date, DATE_FORMAT_DO_MMM_YYYY)}</TableCell> */}
              {/* <TableCell>
                <div className={cn(campus.is_redirect ? 'live' : 'broken', 'flex items-center gap-2.5')}>
                  <div className="circle w-2 h-2 rounded-full" />
                  <span className="font-medium">{campus.is_redirect ? 'Live' : 'Broken'}</span>
                </div>
              </TableCell> */}
              <TableCell>{campus.location || '-'}</TableCell>

              {/* <TableCell>
                <RenderIf isTrue={!!campus.price} fallback={<span>-</span>}>
                  <span>{`£${campus.price}`}</span>
                </RenderIf>
              </TableCell> */}
              {/* <TableCell>{capitalize(campus.status)}</TableCell> */}
              <TableCell className="flex justify-end">
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Image src="/icons/dots-vertical.svg" alt="menu" width={20} height={20} className="cursor-pointer max-w-max" />
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="!w-30.5" side="right" align="start">
                    <div className="flex items-center gap-2 py-1.5">
                      <div className="popover-menu">
                        {popoverMenu().map(item => (
                          <div
                            className="flex items-center gap-2 px-4 py-1.5 text-sm cursor-pointer text-[var(--neutral850)] last:text-[var(--primary600)] leading-[150%]"
                            key={item.name}
                            onClick={() => {
                              item.onClick(campus.campusId);
                            }}
                          >
                            <Image src={item.icon} alt={item.name} loading="lazy" width={16} height={16} />
                            <span style={{ color: 'black' }}>{item.name}</span>
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

export default CampusTable;
