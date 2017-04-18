import { Component } from '@angular/core';

import ProjectService from '../services/project.service';
import MilestoneService from '../services/milestone.service';

@Component({
  selector: 'app-view',
  template: `<navbar></navbar>
            <router-outlet></router-outlet>`,
  providers: [ ProjectService, MilestoneService ]
})
export default class AppComponent {
  constructor() {
    this.name = 'project'
  }
}