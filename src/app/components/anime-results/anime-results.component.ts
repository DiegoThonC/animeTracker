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
  loading: boolean = false;

  constructor(private animeService: AnimeService) { }

  ngOnDestroy(): void {
    this.animeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.animeService.getAllAnimes().subscribe(result => {
      this.animeService.addResultAnime(result.data);
    });

    this.animeSubscription = this.animeService.getResultAnime().subscribe( resp => {
      this.animeResults = resp;
    });
    this.loading = false;
  }
}
