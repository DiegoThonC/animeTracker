import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/interfaces/api_animes.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  wordTerm: string = '';
  pagination: Pagination = {
    current_page: 1,
    has_next_page: true,
    last_visible_page: 0,
    items: {
      count: 0,
      per_page: 0,
      total: 0
    }
  };

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.animeService.getCurrentPage().subscribe( resp => this.pagination = resp );
    this.animeService.getTerm().subscribe( term => this.wordTerm = term );
  }

  goToNextPage() {
    this.pagination.current_page++;
    this.getAnimeData(this.pagination.current_page);
  }

  goToPreviousPage() {
    this.pagination.current_page--;
    this.getAnimeData(this.pagination.current_page);
  }

  getAnimeData(current_page: number) {
    if (this.wordTerm) {
      this.animeService.getAnimesByTerm(this.wordTerm, current_page).subscribe( result => {
        this.animeService.addResultAnime(result.data);
      });
      return;
    }
    
    this.animeService.getAllAnimes(this.pagination.current_page).subscribe( result => {
      this.animeService.addResultAnime(result.data);
    });
  }
}