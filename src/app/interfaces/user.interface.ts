import { UserProfile } from './cat.interface';

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isAuthenticated: boolean;
}

export type { UserProfile };
