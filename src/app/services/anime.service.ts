import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { APIAnime, Anime, Pagination } from '../interfaces/api_animes.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private API_URL = 'https://api.jikan.moe/v4/anime';
  private anime_response$ = new Subject<Anime[]>();
  private pagination$ = new ReplaySubject<Pagination>();
  private term$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAllAnimes(current_page: number): Observable<APIAnime> {
    return this.http.get<APIAnime>(`${this.API_URL}?page=${current_page}`);
  }

  getAnimesByTerm(searchTerm: string, current_page: number): Observable<APIAnime> {
    return this.http.get<APIAnime>(`${this.API_URL}?q=${searchTerm}&page=${current_page}`);
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

  addCurrentPage(page: Pagination) {
    this.pagination$.next(page);
  }

  getCurrentPage(): Observable<Pagination> {
    return this.pagination$.asObservable();
  }

  setTerm(term: string) {
    this.term$.next(term);
  }

  getTerm(): Observable<string> {
    return this.term$.asObservable();
  }
}
