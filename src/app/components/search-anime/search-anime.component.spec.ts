import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { SearchAnimeComponent } from './search-anime.component';
import { AnimeService } from 'src/app/services/anime.service';

describe('SearchAnimeComponent', () => {
  let component: SearchAnimeComponent;
  let fixture: ComponentFixture<SearchAnimeComponent>;
  let animeService: jasmine.SpyObj<AnimeService>;
  let inputElement: jasmine.SpyObj<ElementRef>;

  beforeEach(() => {
    const animeServiceSpy = jasmine.createSpyObj('AnimeService', ['getAnimesByTerm']);
    const inputElementSpy = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    TestBed.configureTestingModule({
      declarations: [SearchAnimeComponent],
      providers: [
        { provide: AnimeService, useValue: animeServiceSpy },
        { provide: ElementRef, useValue: inputElementSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAnimeComponent);
    component = fixture.componentInstance;
    animeService = TestBed.inject(AnimeService) as jasmine.SpyObj<AnimeService>;
    inputElement = TestBed.inject(ElementRef) as jasmine.SpyObj<ElementRef>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call animeService.getAnimesByTerm when a search term is entered', () => {
    const searchValue = 'naruto';
    const event = new Event('keyup');
    const input = fixture.debugElement.query(By.css('input'));

    inputElement.nativeElement = input.nativeElement;
    animeService.getAnimesByTerm.and.returnValue(of({ 
      data: [],
      pagination: {
        last_visible_page: 1,
        has_next_page: false,
        current_page: 1,
        items: {
          count: 25,
          total: 123,
          per_page: 200
        }
      }
    }));

    fixture.detectChanges();

    fromEvent<Event>(input.nativeElement, 'keyup').subscribe((e) => {
      expect(animeService.getAnimesByTerm).toHaveBeenCalledWith(searchValue, 1);
    });
  });
});
