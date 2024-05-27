import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  home = {
    icon: 'pi pi-home',
  };

  @Input() pageCrumb: MenuItem = {};
}
