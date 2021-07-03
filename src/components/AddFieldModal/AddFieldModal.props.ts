export interface AddFieldModalProps{
  isOpen: boolean;
  handleClose: (event?: any) => void;
  onSubmit: (fieldName?: string, fieldType?: string) => void;
};
