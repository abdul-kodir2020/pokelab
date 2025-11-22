import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexLayout } from './pokedex-layout';

describe('PokedexLayout', () => {
  let component: PokedexLayout;
  let fixture: ComponentFixture<PokedexLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
