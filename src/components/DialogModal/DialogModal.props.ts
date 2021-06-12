export interface DialogModalProps{
  isOpen: boolean;
  handleClose: (event?: any) => void;
  onSubmit: (event?: any) => void;
  submitDisabled?: boolean;
  isForm?: boolean;
  fullscreen?: boolean;
  children: any;
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  id?: string;
  title: string;
};
