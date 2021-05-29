export interface NotificationProps {
  message: string;
  type: string;
  autoClose: boolean;
  hideNotification: () => void;
};
