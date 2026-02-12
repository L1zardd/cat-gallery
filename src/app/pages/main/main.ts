import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { UserService } from '../../services/user.service';
import { CatCardComponent } from '../../components/cat-card/cat-card';
import { Cat } from '../../interfaces/cat.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, CatCardComponent],
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class MainComponent implements OnInit {
  allCats: Cat[] = [];
  filteredCats: Cat[] = [];
  allTags: string[] = [];
  searchQuery: string = '';
  selectedTag: string = '';
  user: any = null;

  constructor(
    private catService: CatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // ✅ ПРАВИЛЬНО: подписываемся на Observable
    this.catService.cats$.subscribe((cats: Cat[]) => {
      this.allCats = cats;
      this.filterCats();
    });
    
    // ✅ ПРАВИЛЬНО: подписываемся на теги
    this.catService.getAllTags().subscribe(tags => {
      this.allTags = tags;
    });
    
    this.user = this.userService.getCurrentUser();
  }

  onSearchChange(): void {
    this.filterCats();
  }

  onTagChange(): void {
    this.filterCats();
  }

  filterCats(): void {
    // ✅ ПРАВИЛЬНО: подписываемся на результат фильтрации
    this.catService.filterCats(this.searchQuery, this.selectedTag || null)
      .subscribe(cats => {
        this.filteredCats = cats;
      });
  }

  onToggleFavorite(catId: string): void {
    this.catService.toggleFavorite(catId).subscribe(() => {
      // Обновляем список после изменения избранного
      this.filterCats();
    });
  }

  onSelectAvatar(imageUrl: string): void {
    if (this.user) {
      this.user.avatarUrl = imageUrl;
    }
  }
}