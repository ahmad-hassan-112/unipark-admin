export interface Customers {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  maxVehicles: string;
  employmentStatus: string;
}

interface CustomersMeta {
  total: number;
  totalPages: number;
}

interface Document {
  documentId: number;
  fileName: string;
  uploadedAt: string;
  signedUrl: string;
}

interface CustomerData {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
}

export interface ViewCustomerTableProps {
  enquiries?: Document[];
  customerData?: CustomerData;
}

export interface CustomersTableProps {
  customersData?: Customers[];
  customersMeta: CustomersMeta;
  isPending: boolean;
}
