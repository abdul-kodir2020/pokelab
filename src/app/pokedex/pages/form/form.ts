import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pokedex } from '../../../shared/services/pokedex';
import { Pokemon, PokemonType, EvolutionImage } from '../../../shared/models/pokemon.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class PokemonFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pokedex = inject(Pokedex);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  types: PokemonType[] = [];
  evolutionLines: EvolutionImage[] = [];
  mode: 'create' | 'edit' = 'create';
  editingId: string | null = null;
  original!: Pokemon;

  // Evolution gallery state
  evolutionGallery: Array<{ id: string; stage1: string }> = [];
  selectedEvolutionId: string = '';
  currentEvolutionImages: string[] = [];
  selectedImageUrl: string = '';
  
  // Modal state
  showEvolutionModal = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
    typeId: ['', Validators.required],
    evolutionLineId: ['', Validators.required],
    hp: [40, [Validators.required, Validators.min(1), Validators.max(255)]],
    attack: [60, [Validators.required, Validators.min(1), Validators.max(255)]],
    level: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
  });

  ngOnInit() {
    this.pokedex.getTypes().subscribe(ts => (this.types = ts));
    
    // Load evolution lines and build gallery
    this.pokedex.getEvolutionLines().subscribe((el: EvolutionImage[]) => {
      this.evolutionLines = el;
      this.evolutionGallery = el.map(evolution => ({
        id: evolution.id,
        stage1: evolution.stage1,
      }));
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.editingId = id;
      this.pokedex.getById(id).subscribe(p => {
        this.original = p;
        this.selectedEvolutionId = p.evolutionLineId;
        this.updateEvolutionGallery(p.evolutionLineId);
        this.form.patchValue({
          name: p.name,
          typeId: p.typeId,
          evolutionLineId: p.evolutionLineId,
          hp: p.hp,
          attack: p.attack,
          level: p.level,
          imageUrl: p.imageUrl,
        });
        // In edit mode keep only the name editable
        this.form.get('typeId')?.disable({ emitEvent: false });
        this.form.get('evolutionLineId')?.disable({ emitEvent: false });
        this.form.get('hp')?.disable({ emitEvent: false });
        this.form.get('attack')?.disable({ emitEvent: false });
        this.form.get('level')?.disable({ emitEvent: false });
        this.form.get('imageUrl')?.disable({ emitEvent: false });
        // In edit mode: add async validator to ensure name is unique (excluding current pokemon)
        this.form.get('name')?.setAsyncValidators(this.nameUniqueValidatorEdit.bind(this));
      });
    } else {
      // Create mode: add async validator to ensure unique names
      this.form.get('name')?.setAsyncValidators(this.nameUniqueValidator.bind(this));
    }

    // Type change - auto-fill HP and Attack (create mode only), and update level to 1
    this.form.get('typeId')?.valueChanges.subscribe(typeId => {
      if (this.mode === 'create') {
        const t = this.types.find(x => x.id === typeId);
        if (t) {
          this.form.patchValue({ 
            hp: t.baseHp, 
            attack: t.baseAttack,
            level: 1 
          }, { emitEvent: false });
        }
      }
    });
  }

  get selectedEvolutionImage(): string | undefined {
    if (!this.selectedEvolutionId) return undefined;
    return this.evolutionGallery.find(e => e.id === this.selectedEvolutionId)?.stage1;
  }

  openEvolutionModal() {
    this.showEvolutionModal = true;
  }

  closeEvolutionModal() {
    this.showEvolutionModal = false;
  }

  updateEvolutionGallery(evolutionLineId: string) {
    const evolution = this.evolutionLines.find(el => el.id === evolutionLineId);
    if (evolution) {
      this.currentEvolutionImages = [
        evolution.stage1,
        evolution.stage2,
        evolution.stage3,
      ].filter(img => img && img.trim() !== '');
      
      // Auto-select first image - this is now automatic and user can't change it
      if (this.currentEvolutionImages.length > 0) {
        this.selectedImageUrl = this.currentEvolutionImages[0];
        this.form.patchValue({ imageUrl: this.selectedImageUrl }, { emitEvent: false });
      }
    }
  }

  selectEvolutionLine(evolutionId: string) {
    this.selectedEvolutionId = evolutionId;
    this.form.patchValue({ evolutionLineId: evolutionId }, { emitEvent: false });
    this.updateEvolutionGallery(evolutionId);
    // Close modal automatically after selection
    this.closeEvolutionModal();
  }

  nameUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = (control.value || '').toString().trim().toLowerCase();
    if (!name) return of(null);
    return this.pokedex.getUserPokemons().pipe(
      map(list => {
        const exists = list.some(p => (p.name || '').toString().trim().toLowerCase() === name);
        return exists ? { duplicate: true } : null;
      })
    );
  }

  nameUniqueValidatorEdit(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = (control.value || '').toString().trim().toLowerCase();
    if (!name) return of(null);
    return this.pokedex.getUserPokemons().pipe(
      map(list => {
        // Allow the current pokemon's name; reject any other duplicate (case-insensitive)
        const exists = list.some(p => 
          (p.name || '').toString().trim().toLowerCase() === name && p.id !== this.editingId
        );
        return exists ? { duplicate: true } : null;
      })
    );
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
        typeId: v.typeId!,
        evolutionLineId: v.evolutionLineId!,
        hp: Number(v.hp),
        attack: Number(v.attack),
        level: Number(v.level),
        imageUrl: v.imageUrl!,
      }).subscribe({
        next: () => this.router.navigate(['/pokedex']),
      });
    } else {
      // Only update the name — merge with original to preserve other fields
      const payload: Pokemon = {
        ...this.original,
        name: v.name!,
      };

      this.pokedex.update(this.editingId!, payload).subscribe({
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
