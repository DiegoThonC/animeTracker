import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { APIAnime, Anime, NewAnime } from '../interfaces/api_animes.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private API_URL = 'https://api.jikan.moe/v4/anime';
  private anime_response$ = new Subject<Anime[]>();

  constructor(private http: HttpClient) { }

  getAllAnimes(): Observable<APIAnime> {
    return this.http.get<APIAnime>(this.API_URL);
  }

  getAnimesByTerm(searchTerm: string): Observable<APIAnime> {
    return this.http.get<APIAnime>(`${this.API_URL}?q=${searchTerm}`);
  }

  getAnimeById(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.API_URL}/${id}`);
  }

  addResultAnime(anime: Anime[]) {
    this.anime_response$.next(anime);
  }

  getResultAnime(): Observable<Anime[]> {
    return this.anime_response$.asObservable();
  }
}
