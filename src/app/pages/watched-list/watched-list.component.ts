import { Component, OnInit } from '@angular/core';
import { NewAnime } from 'src/app/interfaces/api_animes.model';

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.scss']
})
export class WatchedListComponent implements OnInit {

  anime_selected: NewAnime[] = [];

  constructor() {}

  ngOnInit(): void {
    this.anime_selected = JSON.parse(localStorage.getItem('anime_selected') as any) || [];
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
