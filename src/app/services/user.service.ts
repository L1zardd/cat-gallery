import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private defaultUser: User = {
    id: 'guest',
    username: 'Гость',
    avatarUrl: 'assets/images/avatars/default-avatar.jpg',
    isAuthenticated: false
  };

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromStorage() || this.defaultUser
  );
  
  user$ = this.userSubject.asObservable();

  constructor() {
    const savedUser = this.getUserFromStorage();
    if (savedUser) {
      this.userSubject.next(savedUser);
    }
  }

  login(username: string): void {
    const user: User = {
      id: 'user_' + Date.now(),
      username: username.trim(),
      avatarUrl: 'assets/images/avatars/default-avatar.jpg',
      isAuthenticated: true
    };
    
    this.saveUserToStorage(user);
    this.userSubject.next(user);
  }

  updateProfile(username: string, avatarUrl: string): void {
    const currentUser = this.userSubject.getValue();
    const updatedUser: User = {
      ...currentUser,
      username: username.trim(),
      avatarUrl: avatarUrl
    };
    
    this.saveUserToStorage(updatedUser);
    this.userSubject.next(updatedUser);
  }

  logout(): void {
    const guestUser: User = {
      ...this.defaultUser,
      id: 'guest_' + Date.now()
    };
    
    localStorage.removeItem('catShowcaseUser');
    this.userSubject.next(guestUser);
  }

  isAuthenticated(): boolean {
    return this.userSubject.getValue().isAuthenticated;
  }

  getCurrentUser(): User {
    return this.userSubject.getValue();
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('catShowcaseUser', JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem('catShowcaseUser');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }
}