export interface AddFieldModalProps{
  isOpen: boolean;
  handleClose: (event?: any) => void;
  onSubmit: (fieldType?: string) => void;
};
