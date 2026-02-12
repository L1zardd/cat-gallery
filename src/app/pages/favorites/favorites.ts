import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { CatCardComponent } from '../../components/cat-card/cat-card';
import { Cat } from '../../interfaces/cat.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CatCardComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Cat[]>; // ✅ Observable вместо массива

  constructor(private catService: CatService) {
    this.favorites$ = this.catService.getFavorites();
  }

  ngOnInit(): void {
    // Обновляем при изменениях
    this.catService.cats$.subscribe(() => {
      this.favorites$ = this.catService.getFavorites();
    });

  }

  onToggleFavorite(catId: string): void {
    this.catService.toggleFavorite(catId).subscribe(() => {
      this.favorites$ = this.catService.getFavorites();
    });
  }
}