import { Component } from '@angular/core';

import ProjectService from '../services/project.service';

@Component({
  selector: 'app-view',
  template: `<navbar></navbar>
            <router-outlet></router-outlet>`,
  providers: [ ProjectService ]
})
export default class AppComponent {
  constructor() {
    this.name = 'project'
  }
}