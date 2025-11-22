import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFavoriteStar]',
  standalone: true
})
export class FavoriteDirective implements OnInit {
  /**
   * Directive qui ajoute une petite étoile en badge en haut à droite du nom des Pokemon favoris
   * Usage: <div [appFavoriteStar]="pokemon.isFavorite">...</div>
   */
  @Input() appFavoriteStar: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appFavoriteStar) {
      // Créer un badge d'étoile
      const badge = document.createElement('div');
      badge.className = 'favorite-star-badge';
      badge.textContent = '⭐';
      
      // Positionnement absolu en haut à droite
      badge.style.position = 'absolute';
      badge.style.top = '-8px';
      badge.style.right = '-13px';
      badge.style.fontSize = '0.8rem';
      
      // Assurer que le parent est position relative
      if (this.el.nativeElement.style.position !== 'absolute' && 
          this.el.nativeElement.style.position !== 'fixed') {
        this.el.nativeElement.style.position = 'relative';
      }
      
      this.el.nativeElement.appendChild(badge);
    }
  }
}
