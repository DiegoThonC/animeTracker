import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimeResultsComponent } from './anime-results.component';
import { AnimeService } from 'src/app/services/anime.service';
import { Subscription, of } from 'rxjs';

describe('AnimeResultsComponent', () => {
  let component: AnimeResultsComponent;
  let fixture: ComponentFixture<AnimeResultsComponent>;
  let animeService: AnimeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeResultsComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [AnimeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeResultsComponent);
    component = fixture.componentInstance;
    animeService = TestBed.inject(AnimeService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch anime results on initialization', () => {
    spyOn(animeService, 'getAllAnimes').and.returnValue(
      of({
        data: [],
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 0,
            total: 0,
            per_page: 0
          }
        }
      })
    );

    component.ngOnInit();
    
    expect(animeService.getAllAnimes).toHaveBeenCalled();
  });

  it('should unsubscribe from animeSubscription on component destruction', () => {
    component.animeSubscription = new Subscription();

    spyOn(component.animeSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.animeSubscription.unsubscribe).toHaveBeenCalled();
  });
});
