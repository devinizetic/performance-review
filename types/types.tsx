export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  roles?: string[];
  isLogout?: boolean;
  highlightAlso?: string;
};

export type UserRoleMap = {
  isReviewee: boolean;
  isReviewer: boolean;
  isAdmin: boolean;
};
