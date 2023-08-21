import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoAnimeComponent } from './pages/info-anime/info-anime.component';
import { HomeComponent } from './pages/home/home.component';
import { WatchedListComponent } from './pages/watched-list/watched-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: "/home", pathMatch: "full",
  },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'infoAnime/:id', component: InfoAnimeComponent
  },
  {
    path: 'watched-list', component: WatchedListComponent
  },
  {
    path: '**', redirectTo: "/home", pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
