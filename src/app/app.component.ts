import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trygraphql';
  public projects: { name: string }[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getLastProjects();
  }

  /**
   * Get Projects from Github graphql API
   */
  getLastProjects() {
    this.appService.getLastProjects()
    .pipe(
      first(),
      tap(projects => {
        this.projects = projects?.data?.viewer?.repositories?.nodes;
      })
    )
    .subscribe();

  }
}
