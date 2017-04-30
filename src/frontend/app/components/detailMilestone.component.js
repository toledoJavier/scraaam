import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import MilestoneService from '../services/milestone.service';
import EpicComponent from './epic.component'

@Component({
  selector: 'detail-milestone',
  inputs: ['data'],
  template: `<h1>{{data.name}}</h1>
      			<h5 class="text-muted">{{data.epics?.length}} Epics</h5>
      			<epic [data]=data (updateMilestoneEvent)="handleUpdateMilestoneEvent($event)"></epic>`,
  directives: [EpicComponent]
})

export default class DetailMilestoneComponent {
	constructor(route, milestoneService) {
		this.route = route
		this.milestoneService = milestoneService
	}

  handleUpdateMilestoneEvent(arg) {
    this.data = arg
  }
}

DetailMilestoneComponent.parameters = [
  ActivatedRoute, MilestoneService
]