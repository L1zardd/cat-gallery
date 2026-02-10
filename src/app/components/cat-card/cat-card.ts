import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cat } from '../../interfaces/cat.interface';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-card.html',
  styleUrls: ['./cat-card.scss']
})
export class CatCardComponent {
  @Input() cat!: Cat;
  @Output() toggleFavorite = new EventEmitter<string>();
  @Output() selectAvatar = new EventEmitter<string>();

  onFavoriteClick(): void {
    this.toggleFavorite.emit(this.cat.id);
  }

  onImageClick(): void {
    this.selectAvatar.emit(this.cat.imageUrl);
  }
}