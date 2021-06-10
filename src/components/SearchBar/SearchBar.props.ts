export interface SearchBarProps{
  value: string;
  disabled: boolean;
  onSubmit: (event: any) => void;
  onChange: (event: any) => void;
};
