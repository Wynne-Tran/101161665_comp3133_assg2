import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignnupComponent } from './signnup/signnup.component';
import { SigninComponent } from './signin/signin.component';
import { ListingsComponent } from './listings/listings.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: SignnupComponent },
  { path: 'signup', component: SignnupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
