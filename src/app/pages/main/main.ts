import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { UserService } from '../../services/user.service';
import { CatCardComponent } from '../../components/cat-card/cat-card';
import { Cat } from '../../interfaces/cat.interface';

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
    this.catService.cats$.subscribe((cats: Cat[]) => {
      this.allCats = cats;
      this.filterCats();
    });
    
    this.allTags = this.catService.getAllTags();
    this.user = this.userService.getCurrentUser();
  }

  onSearchChange(): void {
    this.filterCats();
  }

  onTagChange(): void {
    this.filterCats();
  }

  filterCats(): void {
    this.filteredCats = this.catService.filterCats(this.searchQuery, this.selectedTag || null);
  }

  onToggleFavorite(catId: string): void {
    this.catService.toggleFavorite(catId);
  }

  onSelectAvatar(imageUrl: string): void {
    if (this.user) {
      this.user.avatarUrl = imageUrl;
    }
  }
}