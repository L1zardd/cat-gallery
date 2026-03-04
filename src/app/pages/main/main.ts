import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { UserService } from '../../services/user.service';
import { CatCardComponent } from '../../components/cat-card/cat-card';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal';
import { Cat } from '../../interfaces/cat.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule, CatCardComponent, AuthModalComponent],
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
  showAuthModal: boolean = false;

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
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  onSearchChange(): void {
    this.filterCats();
  }

  onTagChange(): void {
    this.filterCats();
  }

  filterCats(): void {
    this.filteredCats = this.catService.filterCats(
      this.searchQuery, 
      this.selectedTag || null
    );
  }

  onToggleFavorite(catId: string): void {
    if (this.user?.isAuthenticated) {
      this.catService.toggleFavorite(catId);
    } else {
      this.showAuthModal = true;
    }
  }

  onSelectAvatar(imageUrl: string): void {
    if (this.user?.isAuthenticated) {
      localStorage.setItem('tempAvatar', imageUrl);
    } else {
      this.showAuthModal = true;
    }
  }
}