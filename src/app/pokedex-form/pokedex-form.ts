import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Pokedex } from '../shared/services/pokedex';
import { PokemonType } from '../shared/models/pokemon.model';


function statsBudget(max: number) {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const hp = Number(ctrl.get('hp')?.value ?? 0);
    const attack = Number(ctrl.get('attack')?.value ?? 0);
    return hp + attack <= max ? null : { statsBudget: { current: hp + attack, max } };
  };
}

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokedex-form.html',
  styleUrls: ['./pokedex-form.css'],
})
export class PokemonFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pokedex = inject(Pokedex);
  private router = inject(Router);

  types: PokemonType[] = [];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
    type1: ['', Validators.required],
    hp: [40, [Validators.required, Validators.min(1), Validators.max(255)]],
    attack: [60, [Validators.required, Validators.min(1), Validators.max(255)]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
    shinyImageUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    level: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
  }, { validators: [statsBudget(200)] });

  ngOnInit() {
    this.pokedex.getTypes().subscribe(types => this.types = types);

    this.form.get('type1')?.valueChanges.subscribe(typeName => {
      const t = this.types.find(tt => tt.name === typeName);
      if (t) {
        this.form.patchValue({ hp: t.baseHp, attack: t.baseAttack }, { emitEvent: false });
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, type1, hp, attack, imageUrl, shinyImageUrl, level } = this.form.getRawValue();

    this.pokedex.createPokemon({
      name: name!,
      type1: type1!,
      hp: Number(hp),
      attack: Number(attack),
      imageUrl: imageUrl!,
      shinyImageUrl: shinyImageUrl || '',
      level: Number(level),
    }).subscribe({
      next: () => this.router.navigate(['/pokedex']),
      error: (e) => console.error(e),
    });
  }
}
