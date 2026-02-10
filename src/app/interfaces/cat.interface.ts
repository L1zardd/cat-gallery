export interface Cat {
  id: string;
  name: string;
  tags: string[];
  imageUrl: string;
  isFavorite: boolean;
  description?: string;
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isAuthenticated: boolean;
}
