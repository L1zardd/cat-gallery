import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  user: User = {
    id: '',
    username: '',
    avatarUrl: '',
    isAuthenticated: false
  };
  favoritesCount: number = 0;

  constructor(
    private userService: UserService,
    private catService: CatService
  ) {}

  ngOnInit(): void {
    // Подписываемся на изменения пользователя
    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    // Подписываемся на изменения избранного
    this.catService.cats$.subscribe(() => {
      this.favoritesCount = this.catService.getFavorites().length;
    });
  }
} 