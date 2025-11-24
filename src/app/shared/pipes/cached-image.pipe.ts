import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCacheService } from '../services/image-cache.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'cachedImage',
  standalone: true
})
export class CachedImagePipe implements PipeTransform {
  constructor(
    private imageCacheService: ImageCacheService,
    private sanitizer: DomSanitizer
  ) {}

  transform(url: string | null): Observable<SafeUrl> {
    if (!url) {
      return of(this.sanitizer.bypassSecurityTrustUrl(''));
    }

    return this.imageCacheService.getImage(url).pipe(
      map(blob => {
        const objectUrl = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }),
      catchError(error => {
        console.error('Erreur lors du chargement de l\'image:', error);
        return of(this.sanitizer.bypassSecurityTrustUrl(url));
      })
    );
  }
}
