export interface ChangePasswordModalProps{
  isOpen: boolean;
  handleClose: (event?: any) => void;
  updatePassword: (username: string, currentPassword: string, newPassword: string) => any;
  user?: {
    username: string;
    displayName: string;
  },
  showNotification: (message: string, type?: string) => void;
};
