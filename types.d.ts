import { ReactNode } from "react";

interface dataCell {
  id: number;
  createdOn: string;
  payer: string;
  status: string;
  email: string;
  payerPhoneNumber: string;
  service: {
    name: string;
    type: string;
    status: string;
  };
  scheduled: string;
}

interface waitListAPIResponse {
  success: boolean;
  data: dataCell[];
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
  leadTotalRecords: number;
}

interface tableHeader {
  id: number;
  name: string;
  icon: ReactNode;
  value: string;
}

interface tableDataProps {
  data: {
    data: dataCell[];
    success: boolean;
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
  };
  headers: tableHeader[];
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

interface DropDownProps {
  items: string[];
  label: string;
  selected: string | null;
}
