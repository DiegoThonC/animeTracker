import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, debounceTime, distinct, filter, fromEvent, map, switchMap } from 'rxjs';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss']
})
export class SearchAnimeComponent implements OnInit, OnDestroy {

  @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef;

  animeSubscription!: Subscription
  currentPage: number = 1;

  constructor(private animeService: AnimeService) { }

  ngOnDestroy(): void {
    this.animeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.animeSubscription = fromEvent<Event>(this.searchTerm.nativeElement, 'keyup').pipe(
      map((event: Event) => {
        return (event.target as HTMLInputElement).value;
      }),
      filter((searchTerm: string) => (searchTerm.length > 3 || searchTerm.length === 0)),
      debounceTime(500),
      distinct(),
      switchMap((searchTerm: string) => this.animeService.getAnimesByTerm(searchTerm, this.currentPage))
    ).subscribe(result => {
      this.animeService.addResultAnime(result.data);
      this.animeService.addCurrentPage(result.pagination);
      this.animeService.setTerm(this.searchTerm.nativeElement.value);
    })
  }
}
