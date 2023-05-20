import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Anime, Pagination } from 'src/app/interfaces/api_animes.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-anime-results',
  templateUrl: './anime-results.component.html',
  styleUrls: ['./anime-results.component.scss']
})
export class AnimeResultsComponent implements OnInit, OnDestroy {

  animeResults: Anime[] = [];
  animeSubscription!: Subscription;
  current_page: number = 1;

  constructor(private animeService: AnimeService) {
    this.animeService.getAllAnimes(this.current_page).subscribe( result => {
      this.animeService.addResultAnime(result.data);
      this.animeService.addCurrentPage(result.pagination);
    });
  }

  ngOnDestroy(): void {
    this.animeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.animeSubscription = this.animeService.getResultAnime().subscribe( resp => this.animeResults = resp );
  }
}
