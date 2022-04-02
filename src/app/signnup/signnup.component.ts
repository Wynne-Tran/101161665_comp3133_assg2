import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from 'rxjs';
import { map } from 'rxjs';



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

const CREATE_PROFILE = gql`
mutation createProfile(
  $username: String,
  $firstname: String,
  $lastname: String,
  $password: String,
  $email: String,
  $type: String){
    createProfile(
      profileInput: {
      username: $username,
      firstname: $firstname,
      lastname: $lastname,
      password: $password,
      email: $email,
      type: $type
    }){
      username,
      firstname,
      lastname,
      password,
      email,
      type
    }
  }
`


@Component({
  selector: 'app-signnup',
  templateUrl: './signnup.component.html',
  styleUrls: ['./signnup.component.css']
})
export class SignnupComponent implements OnInit {



  profiles: Observable<any> | undefined;
  type: string = ""
  message:any
  checkValid = ""
  data: any[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpClient: HttpClient,
    private apollo: Apollo) { }

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



  createProfile(username: string, firstname: string, lastname: string, password: string, email: string, type?:string) {
    type = this.type;
    console.log(
      username,
      firstname,
      lastname,
      password,
      email,
      type
    )
    this.apollo.mutate({
      mutation: CREATE_PROFILE,
      refetchQueries: [{query: PROFILES}],
      variables: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        type: type
      }
    }).subscribe(() => {
      this.message = "Registered ! Please Log In"
      this.router.navigate(['signup'])
    })
  }

  register(username: string, firstname: string, lastname: string, password: string, email: string, type?:string) {
    const user = this.profiles?.forEach(e => e.find((x: any) => x.username === username ? this.checkValid = username : null))
    console.log(this.checkValid)
    // if (user()) {
    //   this.message = 'Username "' + username + '" is already taken',
    //   this.router.navigate(['/'])
    // }else{
    //   this.message = "",
    //   this.createProfile(username, firstname, lastname, password, email, type);
    // }
  }


}
