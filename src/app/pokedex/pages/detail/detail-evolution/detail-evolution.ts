import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvolutionImage } from '../../../../shared/models/pokemon.model';

@Component({
  selector: 'app-detail-evolution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-evolution.html',
  styleUrls: ['./detail-evolution.css'],
})
export class DetailEvolutionComponent {
  @Input() evolutionLine: EvolutionImage | null = null;
  @Input() pokemon: any;
  @Input() showEvolutionModal = false;
  @Input() evolutionBeforeImage = '';

  @Output() closeEvolutionModal = new EventEmitter<void>();

  onCloseEvolutionModal() {
    this.closeEvolutionModal.emit();
  }
}
