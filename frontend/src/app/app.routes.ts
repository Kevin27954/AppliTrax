import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ApplicationComponent } from './pages/application/application.component';
import { JobBoardComponent } from './pages/job-board/job-board.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    title: 'Register Page',
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
];
