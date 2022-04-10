import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from 'rxjs';
import { map } from 'rxjs';



const BOOKINGS = gql`
{
  customerBooking{
    customerBookings{
      listing_id,
      booking_id,
      booking_date,
      booking_start,
      booking_end,
      username,
    }
  }
}
`;

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent implements OnInit {

  listing_id: string | undefined
  booking_id: string | undefined
  booking_date: string | undefined
  booking_start: string | undefined
  booking_end: string | undefined
  username: string | undefined

  list: Observable<any> | undefined;
  book: Observable<any> | undefined;
  data: any
  userType: any
  message: string | undefined
  results: any[] = []
  resultSearching: any[] = []
  key: string | undefined
  user_id: any
  user_username: any
  list_id: any
  current_day = String(new Date())


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo) {

    }

  ngOnInit (){
    this.userType = this.route.snapshot.queryParamMap.get('type')
    this.user_id = this.route.snapshot.queryParamMap.get('id')
    this.user_username = this.route.snapshot.queryParamMap.get('username')
    this.list_id = this.route.snapshot.queryParamMap.get('listID')

    this.book = this.apollo.watchQuery({
      query: BOOKINGS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('booking: ' + JSON.stringify(result.data.customerBooking.customerBookings));
        return result.data.customerBooking.customerBookings
      })
    )

    this.loadData()

  }


  loadData = () => {
    this.book?.forEach(element => {
      element.forEach(async (e: any) =>
      (
        await  this.results.push(

          {
            listing_id: e.listing_id,
            booking_id: e.booking_id,
            booking_date: String(e.booking_date),
            booking_start: e.booking_start,
            booking_end: e.booking_end,
            username: e.username,

          }
        ))
      )})
    console.log('results: ' + JSON.stringify(this.results))
}



signout() {
  this.router.navigate(['signin'])
}

addListing() {
  this.router.navigate(['listings'],  {queryParams:{type: this.userType, id: this.user_id, username: this.user_username}})
}

viewListing() {
  this.router.navigate(['viewlisting'],  {queryParams:{type: this.userType, id: this.user_id, username: this.user_username}})
}

goBooking() {
  this.router.navigate(['bookings'],  {queryParams:{type: this.userType, id: this.user_id, username: this.user_username}})
}

goAllList() {
  this.router.navigate(['search'],  {queryParams:{type: this.userType, id: this.user_id, username: this.user_username}})
}

viewBooking() {
  this.router.navigate(['viewbooking'],  {queryParams:{type: this.userType, id: this.user_id, username: this.user_username}})
}

}
