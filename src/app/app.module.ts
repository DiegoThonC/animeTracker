import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SearchAnimeComponent } from './components/search-anime/search-anime.component';
import { AnimeResultsComponent } from './components/anime-results/anime-results.component';
import { InfoAnimeComponent } from './pages/info-anime/info-anime.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { WatchedListComponent } from './pages/watched-list/watched-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoAnimeComponent,
    SearchAnimeComponent,
    AnimeResultsComponent,
    NavbarComponent,
    WatchedListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
