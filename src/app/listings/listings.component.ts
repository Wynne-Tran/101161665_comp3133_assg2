import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from 'rxjs';
import { map } from 'rxjs';




@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  list: Observable<any> | undefined;
  profiles: Observable<any> | undefined;
  type: string = ""
  message:any
  data: any[] = []
  user_type: any
  user_id: any
  user_username: any

PROFILES = gql`
  {
    profile{
      profiles{
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


CREATE_LISTING = gql`
mutation createListing(
  $id: String,
  $listing_id: String,
  $listing_title: String,
  $description: String,
  $street: String,
  $city: String,
  $postal_code: String,
  $price: String,
  $email: String){
    createListing(
      id: $id,
      listingInput: {
        listing_id: $listing_id,
        listing_title: $listing_title,
        description: $description,
        street: $street,
        city: $city,
        postal_code: $postal_code,
        price: $price,
        email: $email,
    }){
      listing_id,
      listing_title,
      description,
      street,
      city,
      postal_code,
      price,
      username,
      email,
    }
  }
`


LISTINGS = gql`
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





  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo) { }

  ngOnInit(): void {
    this.user_type = this.route.snapshot.queryParamMap.get('type')
    this.user_id = this.route.snapshot.queryParamMap.get('id')
    console.log(this.user_id)
    this.user_username = this.route.snapshot.queryParamMap.get('username')
    console.log(this.user_username)

    this.list = this.apollo.watchQuery({
      query: this.LISTINGS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('listing: ' + JSON.stringify(result.data.adminListing.adminListings));
        return result.data.adminListing.adminListings
      })
    )

    this.profiles = this.apollo.watchQuery({
      query: this.PROFILES
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('data: ' + JSON.stringify(result.data.profile.profiles));
        return result.data.profile.profiles;
      })
    )

  }

  createListing(
    id: String,
    listing_id: String,
    listing_title: String,
    description: String,
    street: String,
    city: String,
    postal_code: String,
    price: String,
    email: String
  ) {
    this.apollo.mutate({
      mutation: this.CREATE_LISTING,
      refetchQueries: [{query: this.LISTINGS}],
      variables: {
        id: this.user_id,
        listing_id: listing_id,
        listing_title: listing_title,
        description: description,
        street: street,
        city: city,
        postal_code: postal_code,
        price: price,
        email: email,
        username: this.profiles?.forEach((x: any) => x.find((e: any) => e._id === id ? e.username : null))

      }
    }).subscribe(() => {
      this.message = "Something went wrong...!",
      this.router.navigate(['listing']);
    });
  }



  addListing (
    listing_id: String,
    listing_title: String,
    description: String,
    street: String,
    city: String,
    postal_code: String,
    price: String,
    email: String) {


      if(listing_id == "" || listing_title == "" || description == ""){
        this.message = "all field are require !"
        this.router.navigate(['listing'])
      }
      else if (street == "" || city == "" || postal_code == "") {
        this.message = "all field are require !"
        this.router.navigate(['listing'])
      }
      else if (price == "" || email == ""){
        this.message = "all field are require !"
        this.router.navigate(['listing'])
      }
      else{

            this.profiles?.forEach((x: any) => x.find((e: any) => e._id === this.user_id ? this.user_id = e._id : null))
          this.createListing(
            this.user_id,
            listing_id,
            listing_title,
            description,
            street,
            city,
            postal_code,
            price,
            email)

        console.log(
            this.user_id,
            listing_id,
            listing_title,
            description,
            street,
            city,
            postal_code,
            price,
            email
        )
        this.router.navigate(['search'],  {queryParams:{type: this.user_type, id: this.user_id, username: this.user_username}})

      }


  }

  goBack() {
    this.router.navigate(['search'],  {queryParams:{type: this.user_type, id: this.user_id, username: this.user_username}})
  }

}
