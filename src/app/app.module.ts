import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimeResultsComponent } from './components/anime-results/anime-results.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoAnimeComponent } from './pages/info-anime/info-anime.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { SearchAnimeComponent } from './components/search-anime/search-anime.component';
import { WatchedListComponent } from './pages/watched-list/watched-list.component';

@NgModule({
  declarations: [
    AnimeResultsComponent,
    AppComponent,
    FooterComponent,
    HomeComponent,
    InfoAnimeComponent,
    NavbarComponent,
    PaginatorComponent,
    SearchAnimeComponent,
    WatchedListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
