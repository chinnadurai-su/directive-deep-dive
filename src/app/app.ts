import { Component, computed, inject, signal } from '@angular/core';
import { Auth } from './auth/auth';
import { LearningResources } from './learning-resources/learning-resources';
import { AuthService } from './auth/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [Auth, LearningResources],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private AuthService = inject(AuthService);

  isAdmin = computed(() => this.AuthService.activePermission() === 'admin');
}
