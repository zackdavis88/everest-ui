export interface SidebarProps {
  isOpen: boolean;
  onClose: (event: any) => void;
  closeSidebar: () => void;
  navigationItems: {
    name: string;
    url?: string;
    navigationItems?: {
      name: string;
      url?: string;
      onClick?: () => void
    }[];
  }[];
};
