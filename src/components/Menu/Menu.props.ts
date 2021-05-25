import { ReactElement } from "react";

export interface MenuProps {
  id: string;
  menuName: string;
  endIcon?: ReactElement;
  startIcon?: ReactElement;
  disableRipple?: boolean;
  menuItems: {
    name: string;
    onClick: () => void;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
  }[];
};
