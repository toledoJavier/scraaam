import { Component } from '@angular/core';

import ProjectService from '../services/project.service';
import MilestoneService from '../services/milestone.service';
import EpicService from '../services/epic.service';

@Component({
  selector: 'app-view',
  template: `<navbar></navbar>
            <router-outlet></router-outlet>`,
  providers: [ ProjectService, MilestoneService, EpicService ]
})
export default class AppComponent {
  constructor() {
    this.name = 'project'
  }
}