import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from 'rxjs';
import { map } from 'rxjs';


const LISTINGS = gql`
{
  adminListing{
    adminListings{
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


@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})
export class ViewListingComponent implements OnInit {

  listing_id: string | undefined
  listing_title: string | undefined
  description: string | undefined
  street: string | undefined
  city: string | undefined
  postal_code: string | undefined
  price: string | undefined
  email: string | undefined
  username: string | undefined

  list: Observable<any> | undefined;
  data: any
  userType: any
  message: string | undefined
  results: any[] = []
  resultSearching: any[] = []
  key: string | undefined
  user_id: any
  user_username: any

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

    this.list = this.apollo.watchQuery({
      query: LISTINGS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('listing: ' + JSON.stringify(result.data.adminListing.adminListings));
        return result.data.adminListing.adminListings
      })
    )

    this.loadData()

  }


  loadData = () => {
    this.list?.forEach(element => {
      element.forEach(async (e: any) => e.username == this.user_username ?
      (
        await  this.results.push(

          {
            listing_id: e.listing_id,
            listing_title: e.listing_title,
            description: e.description,
            street: e.street,
            city: e.city,
            postal_code:  e.postal_code,
            price:   e.price,
            email: e.email,
            username:  e.username
          }
      )) : null
      )})
    console.log('results: ' + JSON.stringify(this.results))
}

  // getInfo = async() => {
  //   await (history.state)
  //   this.userType = (history.state).userType
  //   console.log('userType:' + this.userType)
  // }

  search = (info: string) => {
    // this.getInfo()
    // if(this.userType == "admin") {

    // }
    // else{
    //   this.message = "User invalid !"
    //   this.router.navigate(['/search'])
    // }
    this.list?.forEach(element => {
      element.forEach(async (e: any) => e.description === (info) ?

        (await  this.resultSearching.push(
          {
            listing_id: e.listing_id,
            listing_title: e.listing_title,
            description: e.description,
            street: e.street,
            city: e.city,
            postal_code:  e.postal_code,
            price:   e.price,
            email: e.email,
            username:  e.username
          }))
          : null

      )})
      if(this.resultSearching == null) {
        this.message = "No result..."
      }
      console.log(this.resultSearching)
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
