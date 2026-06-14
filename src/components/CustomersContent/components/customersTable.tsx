'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Eye } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UiComponents/Table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UiComponents/Popover';
import NoResult from '@/components/UiComponents/NoResult';

import { useDebounce } from '@/hooks/useDebounce';

import { CustomersTableProps } from '@/types/customerTypes';
import Spinner from '@/components/UiComponents/Spinner';



const headerData = [ 'Full name', 'Email', 'Role', 'Status', 'Max Vehicles', '' ];

const CustomersTable: React.FC<CustomersTableProps> = ({ customersData, isPending }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limitParam = searchParams.get('limit') || '10';
  const pageParam = parseInt(searchParams.get('page') ?? '1');

  const debouncedLimit = useDebounce(limitParam, 300);
  const debouncedPage = useDebounce(pageParam, 300);

  const [ currentPage, setCurrentPage ] = useState<number>(pageParam);
  const [ pageLimit, setPageLimit ] = useState<string>(limitParam);
  const [ deleteModalOpen, setDeleteModalOpen ] = useState<boolean>(false);


  const popoverMenu = [
    {
      icon: <Eye size="16px" />,
      name: 'View',
      onClick: (item: number) => router.push(`/users/${item}`),
    },
  ];

  useEffect(() => {
    setCurrentPage(debouncedPage);
    setPageLimit(debouncedLimit);
  }, [ debouncedPage, debouncedLimit ]);

  if (!isPending && (!customersData || customersData?.length === 0)) {
    return <NoResult height="h-[calc(100vh-200px)]" />;
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Spinner />
      </div>
    );
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
          {customersData?.map(item => (
            <TableRow key={item.userId}>
              <TableCell>{item.fullName || '-'}</TableCell>
              <TableCell>{item.email || '-'}</TableCell>
              <TableCell>{item.role || '-'}</TableCell>
              <TableCell>{item.status || '-'}</TableCell>
              <TableCell>{item.maxVehicles || '-'}</TableCell>
              <TableCell className="flex justify-end">
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <Image src="/icons/dots-vertical.svg" alt="menu" width={20} height={20} className="cursor-pointer max-w-max" />
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="!w-30" side="right" align="start">
                    <div className="flex items-center gap-2 py-1.5">
                      <div className="popover-menu">
                        {popoverMenu.map(menu => (
                          <div
                            className="flex items-center gap-2 px-4 py-1.5 text-sm cursor-pointer text-[var(--neutral850)] leading-[150%]"
                            key={menu.name}
                            onClick={() => menu.onClick && menu.onClick(item.userId || 0)}
                          >
                            {menu.icon}
                            <span style={{ color: 'black' }}>{menu.name}</span>
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

export default CustomersTable;
