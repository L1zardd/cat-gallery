import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { CatCardComponent } from '../../components/cat-card/cat-card';
import { Cat } from '../../interfaces/cat.interface';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CatCardComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Cat[] = [];

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.catService.cats$.subscribe(() => {
      this.loadFavorites();
    });
  }

  loadFavorites(): void {
    this.favorites = this.catService.getFavorites();
  }

  onToggleFavorite(catId: string): void {
    this.catService.toggleFavorite(catId);
  }
}