interface Application {
  applicationId: number;
  submittedAt: string;
  permitType: string;
  status: string;
  rejectionReason: string | null;

  applicant: {
    userId: number;
    fullName: string | null;
    email: string | null;
    maxVehicles: number;
    role: string;
    status: string;
    wxOpenId: string;
    employmentStatus: string | null;
  };

  vehicle: {
    vehicleId: number;
    plateNumber: string;
    ownerName: string;
    category: string;
    isOfficialVehicle: boolean;
  };
}

export interface ApplicationListingTableProps {
  applicationData?: Application[];
  isPending: boolean;
}
