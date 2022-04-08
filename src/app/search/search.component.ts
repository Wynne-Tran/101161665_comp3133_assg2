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



const SEARCH = gql`
{
  searchListing(
    info: String){
      searchListings{
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
`

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
  userType: string | undefined
  message: string | undefined
  results: any[] = []
  resultSearching: any[] = []
  key: string | undefined


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo) {
      this.data = history.state
    }

  ngOnInit(){
    this.data = history.state
    console.log(this.data)
    this.list = this.apollo.watchQuery({
      query: LISTINGS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('listing: ' + JSON.stringify(result.data.adminListing.adminListings));
        return result.data.adminListing.adminListings
      })
    )

    this.loadData()

    // await this.getInfo()
    // if (this.userType == "admin"){
    //   this.list = this.apollo.watchQuery({
    //     query: LISTINGS
    //   }).valueChanges.pipe(
    //     map((result: any) => {
    //       console.log('listing: ' + JSON.stringify(result.data.adminListing.adminListings));
    //       return result.data.adminListing.adminListings
    //     })
    //   )
    // }
    // else{
    //   this.message = "User is invalid !"
    //   this.router.navigate(['search'])
    //   alert(this.message)
    // }
    // this.search('');
    // console.log(this.results)
  }

  loadData = () => {
    this.list?.forEach(element => {
      element.forEach(async (e: any) =>

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

      ))})
    console.log('results: ' + JSON.stringify(this.results))
}

  getInfo = async() => {
    this.data = (history.state)
    console.log(this.data)
    // .then(
    //   this.userType = this.data.type
    // )
    // console.log('userType:' + this.userType)
  }

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

}
