import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(private authService: AuthService, private router: Router) {}
}
