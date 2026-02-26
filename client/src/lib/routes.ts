import { UserType } from "./enums";

export const ROUTES = {
  // Public routes
  home: () => '/',
  login: (params?: { userType?: string }) => {
    const path = '/login';
    return params?.userType ? `${path}?userType=${params.userType}` : path;
  },
  signup: (params?: { userType?: UserType }) => {
    const path = '/signup';
    return params?.userType ? `${path}?userType=${params.userType}` : path;
  },
  contractors: () => '/contractors',
  googleOAuthCallback: () => '/google-oauth-callback',
  about: () => '/about',
  blog: () => '/blog',
  careers: () => '/careers',
  privacy: () => '/privacy',
  terms: () => '/terms',
  security: () => '/security',

  // Dashboard routes
  dashboard: () => '/dashboard',
  admin: () => '/dashboard/admin',
  contractor: () => '/dashboard/contractor',
  homeOwner: () => '/dashboard/home-owner',
  profile: () => '/dashboard/profile',
};