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


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  profiles: Observable<any> | undefined;
  message : any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo
  ) {

  }



  ngOnInit(){
    this.profiles = this.apollo.watchQuery({
      query: PROFILES
    }).valueChanges.pipe(
      map((result: any) => {
        console.log('data: ' + JSON.stringify(result.data.profile.profiles));
        return result.data.profile.profiles;
      })
    )
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
      //this.router.navigate([''])
    })
  }




  signIn(username: string,  password: string) {
    const user = this.profiles?.forEach(e => e.find((x: any) => x.username === username && x.password === password))
    if (user) {
      console.log()
      this.message = "username or password incorrect !"
      this.router.navigate(['signin'])
    }
    else{
      this.message = "username or password incorrect !"
      this.router.navigate(['signin'])
    }
  }
}
