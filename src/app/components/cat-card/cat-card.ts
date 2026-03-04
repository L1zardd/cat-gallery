import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cat } from '../../interfaces/cat.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cat-card.html',
  styleUrls: ['./cat-card.scss']
})
export class CatCardComponent implements OnInit {
  @Input() cat!: Cat;
  @Output() toggleFavorite = new EventEmitter<string>();
  @Output() selectAvatar = new EventEmitter<string>();
  
  isAuthenticated: boolean = false;
  showAuthTooltip: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isAuthenticated = user.isAuthenticated;
    });
  }

  onFavoriteClick(): void {
    if (this.isAuthenticated) {
      this.toggleFavorite.emit(this.cat.id);
    } else {
      this.showAuthTooltip = true;
      // Автоматически скрываем через 3 секунды
      setTimeout(() => {
        this.showAuthTooltip = false;
      }, 3000);
    }
  }

  onImageClick(): void {
    this.selectAvatar.emit(this.cat.imageUrl);
  }
}