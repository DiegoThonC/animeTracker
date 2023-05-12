import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { APIAnime, Anime, NewAnime } from 'src/app/interfaces/api_animes.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-info-anime',
  templateUrl: './info-anime.component.html',
  styleUrls: ['./info-anime.component.scss'],
})
export class InfoAnimeComponent implements OnInit {

  @ViewChild("videoPlayer", { static: false }) videoplayer!: ElementRef;

  anime!: any;
  anime_selected: NewAnime[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private animeService: AnimeService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.animeService.getAnimeById(params['id'])),
        tap(console.log)
      )
      .subscribe((anime: APIAnime) => {
        this.anime = anime.data;
      });
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  addAnime(anime: Anime) {
    this.anime_selected = JSON.parse(localStorage.getItem('anime_selected') as any) || [];
    
    for(let a of this.anime_selected) {
      if (a.id === anime.mal_id) {
        return alert('Anime already added!');
      }
    }

    const newAnime: NewAnime = {
      id: anime.mal_id,
      title: anime.title,
      image: anime.images['jpg'].image_url,
      total_episodes: anime.episodes,
      synopsis: anime.synopsis,
      watched_episodes: 0
    }
    
    this.animeService.animeSelected(newAnime);
    this.router.navigate(['/watched-list']);
  }
}
