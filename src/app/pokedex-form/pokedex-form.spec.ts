import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexForm } from './pokedex-form';

describe('PokedexForm', () => {
  let component: PokedexForm;
  let fixture: ComponentFixture<PokedexForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
