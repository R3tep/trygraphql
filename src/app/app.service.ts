import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apollo: Apollo) {}

  getLastProjects(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`{
          viewer {
            repositories(last: 5) {
              nodes {
                name
                createdAt
                description
                isEmpty
                owner {
                  login
                }
                watchers(last: 2) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      `,
    })
    .valueChanges;
  }
} 