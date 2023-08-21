import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Anime } from 'src/app/interfaces/api_animes.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-anime-results',
  templateUrl: './anime-results.component.html',
  styleUrls: ['./anime-results.component.scss']
})
export class AnimeResultsComponent implements OnInit, OnDestroy {

  animeResults: Anime[] = [];
  animeSubscription!: Subscription;

  constructor(private animeService: AnimeService) {
    this.animeService.getAllAnimes().subscribe( result => {
      this.animeService.addResultAnime(result.data);
      this.animeService.addCurrentPage(result.pagination);
    });
  }

  ngOnDestroy(): void {
    if (this.animeSubscription) {
      this.animeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.animeSubscription = this.animeService.getResultAnime().subscribe( resp => this.animeResults = resp );
  }
}
