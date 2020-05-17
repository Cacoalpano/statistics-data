import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './@theme/layouts';
import { AuthenticationGuard } from './@core/guards/authentication.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) }
  , {
    path: '', component: MainLayoutComponent, canActivate: [AuthenticationGuard],
    children: [{ path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
