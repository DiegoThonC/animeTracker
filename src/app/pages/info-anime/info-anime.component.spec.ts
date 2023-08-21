import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InfoAnimeComponent } from './info-anime.component';
import { AnimeService } from 'src/app/services/anime.service';
import { Anime } from 'src/app/interfaces/api_animes.model';

describe('InfoAnimeComponent', () => {
  let component: InfoAnimeComponent;
  let fixture: ComponentFixture<InfoAnimeComponent>;
  let animeService: jasmine.SpyObj<AnimeService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const animeServiceSpy = jasmine.createSpyObj('AnimeService', ['getAnimeById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);

    TestBed.configureTestingModule({
      declarations: [InfoAnimeComponent],
      providers: [
        { provide: AnimeService, useValue: animeServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAnimeComponent);
    component = fixture.componentInstance;
    animeService = TestBed.inject(AnimeService) as jasmine.SpyObj<AnimeService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should fetch anime data and assign it to anime property', () => {
    const animeId = 1;
    const animeData: Anime = {
      mal_id: 0,
      images: { jpg: {
        image_url: 'naruto.jpg',
        small_image_url: '',
        large_image_url: ''
        }},
      title: 'Naruto',
      episodes: 500,
      synopsis: 'An anime series about a young ninja named Naruto.',
      background: null,
      genres: []
    };

    animeService.getAnimeById.and.returnValue(of(animeData));
    activatedRoute.params = of({ id: animeId });

    fixture.detectChanges();

    expect(animeService.getAnimeById).toHaveBeenCalledWith(animeId);
  });

  it('should add anime to the list and navigate to watched-list', () => {
    const animeData: Anime = {
      mal_id: 0,
      images: { jpg: {
        image_url: 'naruto.jpg',
        small_image_url: '',
        large_image_url: ''
        }},
      title: 'Naruto',
      episodes: 500,
      synopsis: 'An anime series about a young ninja named Naruto.',
      background: null,
      genres: []
    };

    component.addAnime(animeData);

    expect(localStorage.getItem('anime_selected')).not.toBeNull();
  });
});
