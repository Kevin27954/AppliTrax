import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css',
})
export class JobBoardComponent {
  constructor(private authService: AuthService) {}
}
