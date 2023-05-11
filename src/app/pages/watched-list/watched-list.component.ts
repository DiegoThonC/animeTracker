import { Component } from '@angular/core';
import { NewAnime } from 'src/app/interfaces/api_animes.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.scss']
})
export class WatchedListComponent {

  anime_selected: NewAnime[] = [];

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {

    this.anime_selected = JSON.parse(localStorage.getItem('anime_selected') as any) || [];

    this.animeService.getAnimeSelected().subscribe( resp => {
      this.anime_selected.push(resp);
      localStorage.setItem('anime_selected', JSON.stringify(this.anime_selected));
    });
  }

  increaseWached(anime: NewAnime) {
    anime.watched_episodes++;
    localStorage.setItem('anime_selected', JSON.stringify(this.anime_selected));
  }

  decreaseWached(anime: NewAnime) {
    anime.watched_episodes--;
    localStorage.setItem('anime_selected', JSON.stringify(this.anime_selected));
  }

  deleteAnime(anime: NewAnime) {
    const conf = confirm('Are you sure you want to delete this anime?');
    if (conf) {
      this.anime_selected = this.anime_selected.filter( animeDeleted => anime.id != animeDeleted.id );
      localStorage.setItem('anime_selected', JSON.stringify(this.anime_selected));
    }
  }
}
