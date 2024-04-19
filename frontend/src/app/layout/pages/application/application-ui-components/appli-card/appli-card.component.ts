import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appli-card',
  standalone: true,
  imports: [],
  templateUrl: './appli-card.component.html',
  styleUrl: './appli-card.component.css',
})
export class AppliCardComponent {
  @Input({ required: true }) jobTitle!: string;
  @Input({ required: true }) company!: string;
  @Input({ required: true }) location!: string;
  @Input({ required: true }) jobType!: string;
}
