import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DongGopComponent } from './dong-gop/dong-gop.component';
import { Page404Component } from './page-404/page-404.component';
import { CacViVuaComponent } from './thu-vien-tri-thuc/cac-vi-vua/cac-vi-vua.component';
import { SuKienNhanVatComponent } from './thu-vien-tri-thuc/su-kien-nhan-vat/su-kien-nhan-vat.component';
import { VanBanChieuChiComponent } from './thu-vien-tri-thuc/van-ban-chieu-chi/van-ban-chieu-chi.component';
import { BieuDoSoDoComponent } from './thu-vien-tri-thuc/bieu-do-so-do/bieu-do-so-do.component';
import { ThuVienTriThucComponent } from './thu-vien-tri-thuc/thu-vien-tri-thuc.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailViewComponent } from './detail-view/detail-view.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
           { path: 'about', component: AboutComponent },
         { path: 'dong-gop', component: DongGopComponent },
         { path: 'detail/:id', component: DetailViewComponent },
  
  // Admin routes
  { path: 'admin', component: LoginComponent },
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  
  // Knowledge library routes
  {
    path: 'thu-vien-tri-thuc',
    component: ThuVienTriThucComponent,
    children: [
      { path: 'cac-vi-vua', component: CacViVuaComponent },
      { path: 'su-kien-nhan-vat', component: SuKienNhanVatComponent},
      { path: 'van-ban-chieu-chi', component: VanBanChieuChiComponent},
      { path: 'bieu-do-so-do', component: BieuDoSoDoComponent},
      { path: '', redirectTo: 'cac-vi-vua', pathMatch: 'full' }
    ]
  },
  
  { path: 'page-404', component: Page404Component },
  { path: '**', redirectTo: 'page-404' },
];
