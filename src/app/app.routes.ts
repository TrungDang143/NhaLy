import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CacViVuaComponent } from './thu-vien-tri-thuc/cac-vi-vua/cac-vi-vua.component';
import { SuKienNhanVatComponent } from './thu-vien-tri-thuc/su-kien-nhan-vat/su-kien-nhan-vat.component';
import { VanBanChieuChiComponent } from './thu-vien-tri-thuc/van-ban-chieu-chi/van-ban-chieu-chi.component';
import { BieuDoSoDoComponent } from './thu-vien-tri-thuc/bieu-do-so-do/bieu-do-so-do.component';
import { ThuVienTriThucComponent } from './thu-vien-tri-thuc/thu-vien-tri-thuc.component';

export const routes: Routes = [
{ path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
//   { path: 'sign-up', component: SignUpComponent },
//   { path: 'forgot', component: ForgotComponent },
//   { path: 'validate-code', component: ValidateCodeComponent },
//   { path: 'new-password', component: NewPasswordComponent },
  {
    path: 'thu-vien-tri-thuc',
    component: ThuVienTriThucComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'cac-vi-vua', component: CacViVuaComponent },
      { path: 'su-kien-nhan-vat', component: SuKienNhanVatComponent},
      { path: 'van-ban-chieu-chi', component: VanBanChieuChiComponent},
      { path: 'bieu-do-so-do', component: BieuDoSoDoComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: '**', redirectTo: 'page-404' },
];
