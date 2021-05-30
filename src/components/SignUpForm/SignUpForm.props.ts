export interface SignUpFormProps{
  authenticate: (username: string, password: string) => any;
  setShowLoginForm: (boolean) => void;
};