import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: '',
    username: '',
    avatarUrl: '',
    isAuthenticated: false
  };
  
  tempUsername: string = '';
  tempAvatarUrl: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.tempUsername = this.user.username;
    this.tempAvatarUrl = this.user.avatarUrl;
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempAvatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.hasChanges()) {
      this.userService.updateProfile(this.tempUsername, this.tempAvatarUrl);
      this.user = this.userService.getCurrentUser();
    }
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  hasChanges(): boolean {
    return this.tempUsername !== this.user.username || 
           this.tempAvatarUrl !== this.user.avatarUrl;
  }
}