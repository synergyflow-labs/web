import { Directive, ElementRef, OnDestroy, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appFadeInOnScroll]',
  standalone: true,
  host: {
    class: 'fade-in',
  },
})
export class FadeInOnScrollDirective implements OnDestroy {
  private readonly el = inject(ElementRef).nativeElement;
  private observer: IntersectionObserver | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly threshold = input<number>(0.2);
  readonly delay = input<number>(0);

  constructor() {
    effect(() => {
      this.cleanup();

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        this.el.classList.add('appear');
        return;
      }

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.timeoutId = setTimeout(() => {
              this.el.classList.add('appear');
            }, this.delay());

            this.observer?.unobserve(this.el);
          }
        },
        { threshold: this.threshold() },
      );

      this.observer.observe(this.el);
    });
  }

  private cleanup(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.observer) this.observer.disconnect();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
