export interface LoginFormProps{
  authenticate: (username: string, password: string) => any;
  setShowLoginForm: (boolean) => void;
  authInProgress: boolean;
  in: boolean;
};