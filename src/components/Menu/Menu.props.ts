import { ReactElement } from "react";

export interface MenuProps {
  id: string;
  menuName: string;
  endIcon?: ReactElement;
  startIcon?: ReactElement;
  disableRipple?: boolean;
  disableFocusRipple?: boolean;
  menuItems: {
    name: string;
    onClick?: any;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    url?: string;
  }[];
};
