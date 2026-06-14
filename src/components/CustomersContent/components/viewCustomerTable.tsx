'use client';

import React from 'react';
import moment from 'moment';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/UiComponents/Table';
import NoResult from '@/components/UiComponents/NoResult';

import { ViewCustomerTableProps } from '@/types/customerTypes';

const headerData = [ 'Document ID', 'File name', 'Uploaded At', 'Action' ];

const ViewCustomersTable: React.FC<ViewCustomerTableProps> = ({ enquiries }) => {
  if (enquiries?.length === 0) {
    return <NoResult height="h-[calc(100vh-300px)]" />;
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
          {enquiries?.map(item => (
            <TableRow key={item.documentId}>
              <TableCell className="text-[var(--secondaryBase)] font-medium">{item.documentId}</TableCell>
              <TableCell>{item.fileName}</TableCell>
              <TableCell>{moment(item.uploadedAt).format('Do MMM, YY')}</TableCell>
              <TableCell>
                <a target="_blank" href={item.signedUrl} style={{ color: '#186AFF' }}>
                  Click to View
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewCustomersTable;
