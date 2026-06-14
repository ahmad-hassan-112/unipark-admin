export interface Campus {
  campusId: number;
  name: string;
  location: string
}

export interface CampusListingTableProps {
  campusData?: Campus[];
  isPending: boolean;
}
