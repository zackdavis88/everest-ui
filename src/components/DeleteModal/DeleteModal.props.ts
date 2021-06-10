export interface DeleteModalProps{
  isOpen: boolean;
  handleClose: (event?: any) => void;
  deleteResource: (id: string, nameInput: string) => any;
  resource: {
    id: string;
    name: string;
  },
  showNotification: (message: string, type?: string) => void;
  resourceType: string;
};
