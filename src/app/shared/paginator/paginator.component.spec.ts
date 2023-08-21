import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimeService } from 'src/app/services/anime.service';
import { of } from 'rxjs';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let animeService: jasmine.SpyObj<AnimeService>;
  
  beforeEach(() => {
    const animeServiceSpy = jasmine.createSpyObj('AnimeService', ['getCurrentPage', 'getTerm', 'getAnimesByTerm', 'getAllAnimes', 'addResultAnime']);
    
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [{ provide: AnimeService, useValue: animeServiceSpy }],
      imports: [ HttpClientTestingModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    animeService = TestBed.inject(AnimeService) as jasmine.SpyObj<AnimeService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call animeService.getAnimesByTerm when wordTerm is present', () => {
    const wordTerm = 'naruto';
    const currentPage = 1;
    const result = {
      data: [],
      pagination: {
        last_visible_page: 1,
        has_next_page: false,
        current_page: 1,
        items: {
          count: 0,
          total: 0,
          per_page: 0,
        },
      },
    };

    animeService.getCurrentPage.and.returnValue(of(component.pagination));
    animeService.getTerm.and.returnValue(of(wordTerm));
    animeService.getAnimesByTerm.and.returnValue(of(result));

    fixture.detectChanges();

    component.goToNextPage();

    expect(animeService.getAnimesByTerm).toHaveBeenCalledWith(wordTerm, currentPage + 1);
    expect(animeService.addResultAnime).toHaveBeenCalledWith(result.data);
  });

  it('should call animeService.getAllAnimes when wordTerm is not present', () => {
    const currentPage = 1;
    const result = {
      data: [],
      pagination: {
        last_visible_page: 1,
        has_next_page: false,
        current_page: 1,
        items: {
          count: 0,
          total: 0,
          per_page: 0,
        },
      },
    };

    animeService.getCurrentPage.and.returnValue(of(component.pagination));
    animeService.getTerm.and.returnValue(of(''));
    animeService.getAllAnimes.and.returnValue(of(result));

    fixture.detectChanges();

    component.goToPreviousPage();

    expect(animeService.getAllAnimes).toHaveBeenCalledWith(currentPage - 1);
    expect(animeService.addResultAnime).toHaveBeenCalledWith(result.data);
  });
});
