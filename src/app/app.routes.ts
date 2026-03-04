import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { MainComponent } from './pages/main/main';
import { FavoritesComponent } from './pages/favorites/favorites';
import { ProfileComponent } from './pages/profile/profile';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { 
    path: '', 
    component: LandingComponent 
  },
  { 
    path: 'main', 
    component: MainComponent,
    canActivate: [AuthGuard],
    data: { animation: 'MainPage' }
  },
  { 
    path: 'favorites', 
    component: FavoritesComponent,
    canActivate: [AuthGuard],
    data: { animation: 'FavoritesPage' }
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { animation: 'ProfilePage' }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];