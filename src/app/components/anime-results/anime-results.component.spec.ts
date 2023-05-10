import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeResultsComponent } from './anime-results.component';

describe('AnimeResultsComponent', () => {
  let component: AnimeResultsComponent;
  let fixture: ComponentFixture<AnimeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
