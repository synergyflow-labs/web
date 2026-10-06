import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private readonly document = inject(DOCUMENT);

  get nativeWindow(): Window | null {
    return this.document.defaultView;
  }
}
