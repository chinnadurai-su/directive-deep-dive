import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from '../models/auth-model';
import { AuthService } from '../services/auth-service';

@Directive({
  selector: '[appAuthDirective]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuthDirective' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  constructor() {
    effect(() => {
      const activePermission = this.authService.activePermission();
      const requiredPermission = this.userType();

      if (activePermission === requiredPermission) {
        console.log('User has permission to view this element.');
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        console.log('User does NOT have permission to view this element.');
        this.viewContainerRef.clear();
      }
    });
  }
}
