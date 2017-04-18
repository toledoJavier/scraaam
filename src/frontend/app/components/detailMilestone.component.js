import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import MilestoneService from '../services/milestone.service';

@Component({
  selector: 'detail-milestone',
  inputs: ['data'],
  template: `<h1>{{data.name}}</h1>
  			{{data.epics?.length}} Epics - Tasks`
})

export default class DetailMilestoneComponent {
	constructor(route, milestoneService) {
		this.route = route
		this.milestoneService = milestoneService
	}
}

DetailMilestoneComponent.parameters = [
  ActivatedRoute, MilestoneService
]