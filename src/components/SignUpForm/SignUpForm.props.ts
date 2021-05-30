export interface SignUpFormProps{
  createUser: (username: string, password: string) => any;
  showNotification: (message: string, type?: string, autoClose?: boolean) => void;
  setShowLoginForm: (boolean) => void;
};