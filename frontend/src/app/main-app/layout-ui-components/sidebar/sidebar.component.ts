import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faArrowTrendUp = faArrowTrendUp;

  @Output() pageChange = new EventEmitter<string>();
  @Output() signOutBtn = new EventEmitter<void>();

  signOutBtnEmitter() {
    this.signOutBtn.emit();
  }

  pageChangeEmitter(page: string) {
    this.pageChange.emit(page);
  }
}
