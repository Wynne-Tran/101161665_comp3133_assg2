import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignnupComponent } from './signnup/signnup.component';
import { SigninComponent } from './signin/signin.component';
import { ListingsComponent } from './listings/listings.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { SearchComponent } from './search/search.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { ViewbookingComponent } from './viewbooking/viewbooking.component';




@NgModule({
  declarations: [
    AppComponent,
    SignnupComponent,
    SigninComponent,
    ListingsComponent,
    BookingsComponent,
    SearchComponent,
    ViewListingComponent,
    BookListingComponent,
    ViewbookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
