export interface TableProps {
  isLoading?: boolean;
  items: {
    id: string,
    name: string,
    createdOn: string,
    updatedOn?: string,
    createdBy?: {
      username: string,
      displayName: string
    },
    updatedBy?: {
      username: string,
      displayName: string
    }
  }[];
  page: number;
  itemsPerPage: number;
  totalItems: number;
  headers: {
    label: string;
    key: string;
    hidden?: string;
  }[];
  columns: {
    key: string;
    hidden?: string;
    format?: (data: any) => void;
  }[];
  onPaginationChange: (key: string) => (event: any, page?: number) => void;
};
