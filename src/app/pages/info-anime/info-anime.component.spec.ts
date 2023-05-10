import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAnimeComponent } from './info-anime.component';

describe('InfoAnimeComponent', () => {
  let component: InfoAnimeComponent;
  let fixture: ComponentFixture<InfoAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAnimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
