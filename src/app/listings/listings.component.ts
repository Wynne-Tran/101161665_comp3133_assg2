import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from 'rxjs';
import { map } from 'rxjs';



// const LISTINGS = gql`
// {
//   adminListing{
//     adminListing{
//       listing_id,
//       listing_title,
//       description,
//       street,
//       city,
//       postal_code,
//       price,
//       email,
//       username,
//     }
//   }
// }
// `;



// const SEARCH = gql`
// {
// seachListing(
//   $info: String){
//       listing_id,
//       listing_title,
//       description,
//       street,
//       city,
//       postal_code,
//       price,
//       email,
//       username,
//     }
//   }
// `
@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  // profiles: Observable<any> | undefined;
  // type: string = ""
  // message:any
  // data: any[] = []
  // user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo) { }

  ngOnInit(): void {

  }

  // ngOnInit(){
  //   this.profiles = this.apollo.watchQuery({
  //     query: LISTINGS
  //   }).valueChanges.pipe(
  //     map((result: any) => {
  //       console.log('data: ' + JSON.stringify(result.data.profile.profiles));
  //       return result.data.profile.profiles;
  //     })
  //   )

  // }

}
