export interface NavbarProps {
  user?: {
    username: string;
    displayName: string;
  },
  logout: () => void;
};
