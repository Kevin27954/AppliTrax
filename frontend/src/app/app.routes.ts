import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './main-app/layout.component';
import { OverviewComponent } from './main-app/pages/overview/overview.component';
import { ApplicationComponent } from './main-app/pages/application/application.component';
import { JobBoardComponent } from './main-app/pages/job-board/job-board.component';
import { TrendingComponent } from './main-app/pages/trending/trending.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard()],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: OverviewComponent,
        title: 'Overview',
      },
      {
        path: 'application',
        component: ApplicationComponent,
        title: 'Applications',
      },
      {
        path: 'jobboards',
        component: JobBoardComponent,
        title: 'JobBoards',
      },
      {
        path: 'trending',
        component: TrendingComponent,
        title: 'Trending Applications',
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
      },
    ],
  },
];
