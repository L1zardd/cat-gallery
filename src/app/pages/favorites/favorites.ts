import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { CatCardComponent } from '../../components/cat-card/cat-card';
import { Cat } from '../../interfaces/cat.interface';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, CatCardComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Cat[] = [];
  isLoading: boolean = true;

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadFavorites();
    
    // Подписываемся на изменения
    this.catService.cats$.subscribe(() => {
      this.loadFavorites();
    });
  }

  loadFavorites(): void {
    this.isLoading = true;
    // Имитация загрузки
    setTimeout(() => {
      this.favorites = this.catService.getFavorites();
      this.isLoading = false;
    }, 500);
  }

  onToggleFavorite(catId: string): void {
    this.catService.toggleFavorite(catId);
  }

  onSelectAvatar(imageUrl: string): void {
    localStorage.setItem('tempAvatar', imageUrl);
  }

  // Склонение существительных
  getNoun(number: number, one: string, two: string, five: string): string {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }
}