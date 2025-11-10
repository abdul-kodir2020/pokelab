import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokedex } from '../shared/services/pokedex';
import { Pokemon, PokemonType } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokedex-form.html',
})
export class PokemonFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pokedex = inject(Pokedex);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  types: PokemonType[] = [];
  mode: 'create' | 'edit' = 'create';
  editingId: string | number | null = null;
  original!: Pokemon;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
    type1: ['', Validators.required],
    hp: [40, [Validators.required, Validators.min(1), Validators.max(255)]],
    attack: [60, [Validators.required, Validators.min(1), Validators.max(255)]],
    level: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
    shinyImageUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
  });

  ngOnInit() {
    this.pokedex.getTypes().subscribe(ts => (this.types = ts));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.editingId = id;
      this.pokedex.getById(id).subscribe(p => {
        this.original = p;
        this.form.patchValue({
          name: p.name,
          type1: p.type1,
          hp: p.hp,
          attack: p.attack,
          level: p.level,
          imageUrl: p.imageUrl,
          shinyImageUrl: p.shinyImageUrl,
        });
      });
    }

    this.form.get('type1')?.valueChanges.subscribe(typeName => {
      if (this.mode === 'create') {
        const t = this.types.find(x => x.name === typeName);
        if (t) {
          this.form.patchValue({ hp: t.baseHp, attack: t.baseAttack }, { emitEvent: false });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();

    if (this.mode === 'create') {
      this.pokedex.createPokemon({
        name: v.name!,
        type1: v.type1!,
        hp: Number(v.hp),
        attack: Number(v.attack),
        level: Number(v.level),
        imageUrl: v.imageUrl!,
        shinyImageUrl: v.shinyImageUrl || '',
      }).subscribe({
        next: () => this.router.navigate(['/pokedex']),
      });
    } else {
      this.pokedex.update(this.editingId!, {
        name: v.name!,
        type1: v.type1!,
        hp: Number(v.hp),
        attack: Number(v.attack),
        level: Number(v.level),
        imageUrl: v.imageUrl!,
        shinyImageUrl: v.shinyImageUrl || '',
      }).subscribe({
        next: () => this.router.navigate(['/pokedex']),
      });
    }
  }

  get title() {
    return this.mode === 'create' ? 'Ajouter un Pokémon' : 'Modifier un Pokémon';
  }

  get submitLabel() {
    return this.mode === 'create' ? 'Créer' : 'Mettre à jour';
  }
}
