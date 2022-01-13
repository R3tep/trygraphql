import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const uri = 'https://api.github.com/graphql'; 

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext(() => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));
  const token = environment.github_token;
  const auth = setContext(() => ({
    headers: {
      Authorization: `Bearer ${token}`
    },
  }));
  
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}
