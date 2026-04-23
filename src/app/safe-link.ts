import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirm($event)',
  },
})
export class SafeLink {
  queryParams = input('myapp-google-search', { alias: 'appSafeLink' });
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  constructor() {
    console.log('SafeLink directive initialized');
  }

  onConfirm(event: Event) {
    const anchor = this.hostElement.nativeElement;
    const url = anchor.href;

    if (!confirm(`Are you sure you want to navigate to ${url}?`)) {
      event.preventDefault();
    }

    if (this.queryParams) {
      anchor.href += `?${this.queryParams()}`;
    }
  }
}
