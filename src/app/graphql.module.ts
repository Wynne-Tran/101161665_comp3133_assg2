import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
//import { InMemoryCache } from '@apollo/client'
import { InMemoryCache, ApolloClient } from '@apollo/client/core';


const uri = 'http://localhost:3000/graphql'

export function createAppllo(httpLink: HttpLink){
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}


@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createAppllo,
    deps: [HttpLink],
  }]
})

export class GraphQLModule {}
