import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent {
  username: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.username.trim()) {
      this.userService.login(this.username.trim());
      this.router.navigate(['/main']);
    }
  }
}