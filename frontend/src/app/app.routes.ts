import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ApplicationComponent } from './pages/application/application.component';
import { JobBoardComponent } from './pages/job-board/job-board.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';

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
