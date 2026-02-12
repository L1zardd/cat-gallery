export interface Cat {
  id?: string;
  name: string;
  tags: string[];
  imageUrl: string;
  isFavorite?: boolean;
  description?: string;
  createdAt?: Date;
}

export interface Favorite {
  id?: string;
  userId: string;
  catId: string;
  createdAt: Date;
}

export interface UserProfile {
  uid: string;
  username: string;
  avatarUrl: string;
  email?: string;
  createdAt: Date;
}
