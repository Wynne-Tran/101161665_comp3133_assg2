import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'

import { Observable } from 'rxjs';
import { map }  from 'rxjs/operators'


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


const AUTH = gql`
mutation login(
  $username: String,
  $password: String){
    login(
      loginInput: {
      username: $username,
      password: $password,
    }){
      username,
      password,
    }
  }
`



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



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


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
  results: any[] = []
  resultSearching: any[] = []
  key: string | undefined
  user_id: any
  user_username: any

  profiles: Observable<any> | undefined;
  user: any
  message : any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo
  ) {

  }



  ngOnInit(){
    console.log(history.state)
    this.profiles = this.apollo.watchQuery({
      query: PROFILES
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('data: ' + JSON.stringify(result.data.profile.profiles));
        return result.data.profile.profiles;
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

    this.loadData()
  }

  login(username: string, password: string) {
    this.apollo.mutate({
      mutation: AUTH,
      refetchQueries: [{query: PROFILES}],
      variables: {
        username: username,
        password: password,
      }
    }).subscribe(() => {
      console.log("OK")
    })
  }




  signIn = (username: string,  password: string) => {
    this.profiles?.forEach(e => e.find((x: any) => x.username === username && x.password === password ? this.user = x : null))

    if(username == "" || password == ""){
      this.message = "all field are require !"
      this.router.navigate(['signin'])
    }
    if(this.user != null) {
      console.log(this.user)
      this.router.navigate(['search'],  {queryParams:{type: this.user.type, id: this.user._id, username: this.user.username, email: this.user.email}})
    }
    else if(this.user == undefined){
      window.onload
    }
    else{
      this.message = "username or password incorrect !"
      this.router.navigate(['signin'])
    }
  }




  loadData = () => {
    this.list?.forEach(element => {
      element.forEach(async (e: any) =>

        await  this.results.push(

          {
            _id: e._id,
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


  search = (info: string) => {

    this.list?.forEach(element => {
      element.forEach(async (e: any) => (e.listing_title === (info) || e.city === (info) || e.postal_code === (info)) ?

        (await  this.resultSearching.push(
          {
            listing_id: e.listing_id,
            listing_title: e.listing_title,
            description: e.description,
            street: e.street,
            city: e.city,
            postal_code: e.postal_code,
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

}
