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
      _id
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




const PROFILES = gql`
{
  profile{
    profiles{
      _id,
      username,
      firstname,
      lastname,
      password,
      email,
      type
    }
  }
}
`;


const LISTINGS = gql`
{
  adminListing{
    adminListings{
      _id,
      listing_id,
      listing_title,
      description,
      street,
      city,
      postal_code,
      price,
      email,
      username,
    }
  }
}
`;




const CREATE_BOOKINGS = gql`
mutation createBooking(
  $id: String,
  $_id: String,
  $booking_id: String,
  $booking_start: String,
  $booking_end: String,
  ){
    createBooking(
      id: $id,
      _id: $_id,
      bookingInput: {
        booking_id: $booking_id,
        booking_start: $booking_start,
        booking_end: $booking_end,
    }){
      listing_id,
      booking_id,
      booking_date,
      booking_start,
      booking_end,
      username,
    }
  }
`


@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.css']
})
export class BookListingComponent implements OnInit {

  listing_id: string | undefined
  booking_id: string | undefined
  booking_date: string | undefined
  booking_start: string | undefined
  booking_end: string | undefined
  username: string | undefined

  list: Observable<any> | undefined;
  book: Observable<any> | undefined;
  profiles: Observable<any> | undefined;
  data: any
  userType: any
  message: string | undefined
  results: any[] = []
  resultSearching: any[] = []
  key: string | undefined
  user_id: any
  user_username: any
  list_id: any
  get_listing: any


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
    this.get_listing = this.route.snapshot.queryParamMap.get('listing_id')
    console.log(this.list_id)
    console.log(this.get_listing)

    this.book = this.apollo.watchQuery({
      query: BOOKINGS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('booking: ' + JSON.stringify(result.data.customerBooking.customerBookings));
        return result.data.customerBooking.customerBookings
      })
    )

    this.list = this.apollo.watchQuery({
      query: LISTINGS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('listing: ' + JSON.stringify(result.data.adminListing.adminListings));
        return result.data.adminListing.adminListings
      })
    )


    this.profiles = this.apollo.watchQuery({
      query: PROFILES
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('data: ' + JSON.stringify(result.data.profile.profiles));
        return result.data.profile.profiles;
      })
    )

    this.loadData()

  }


  loadData = () => {
    this.book?.forEach(element => {
      element.forEach(async (e: any) => e.username == this.user_username?
      (
        await  this.results.push(

          {
            listing_id: e.listing_id,
            booking_id: e.booking_id,
            booking_date: e.booking_date,
            booking_start: e.booking_start,
            booking_end: e.booking_end,
            username: e.username,

          }
        )) : null
      )})
    console.log('results: ' + JSON.stringify(this.results))
}



createBooking(
  id: String,
  _id: String,
  booking_id: String,
  booking_start: String,
  booking_end: String,
) {
  this.apollo.mutate({
    mutation: CREATE_BOOKINGS,
    refetchQueries: [{query: BOOKINGS}],
    variables: {
      id: this.user_id,
      _id: this.list_id,
      listing_id: this.list?.forEach((x: any) => x.find((e: any) => e._id === this.list_id ? e.listing_id : null)),
      booking_id: booking_id,
      booking_date: new Date().toLocaleDateString(),
      booking_start: booking_start,
      booking_end: booking_end,
      username: this.profiles?.forEach((x: any) => x.find((e: any) => e._id === id ? e.username : null))

    }
  }).subscribe(() => {
    this.message = "Something went wrong...!",
    this.router.navigate(['book-listing']);
  });
}



book_listing(id: String,
  _id: String,
  booking_id: String,
  booking_start: String,
  booking_end: String){

    if(booking_id == "" || booking_start == "" || booking_end == ""){
      this.message = "all field are require !"
      this.router.navigate(['booking-listing'])
    }

    else {
      this.profiles?.forEach((x: any) => x.find((e: any) => e._id === id ? this.user_id = e._id : null))
      this.list?.forEach((x: any) => x.find((e: any) => e._id === _id ? this.list_id= e._id : null))
      this.createBooking(
          this.user_id,
          this.list_id,
          booking_id,
          booking_start,
          booking_end,
          )

    console.log(
      this.user_id,
      this.list_id,
      booking_id,
      booking_start,
      booking_end,
      this.user_username
    )

    this.addListing()
    }


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


}
