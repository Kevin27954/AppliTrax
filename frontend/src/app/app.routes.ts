import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './layout/pages/overview/overview.component';
import { ApplicationComponent } from './layout/pages/application/application.component';
import { JobBoardComponent } from './layout/pages/job-board/job-board.component';
import { TrendingComponent } from './layout/pages/trending/trending.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
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
