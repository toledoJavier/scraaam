import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProjectService from '../services/project.service';

@Component({
  selector: 'milestone',
  template: `<span class="span-page">{{project.name}} | Milestones </span>
  			<hr>
  			<new-milestone></new-milestone>`
})

export default class MilestoneComponent {
	constructor(route, projectService) {
		this.data = {}
		this.route = route
		this.projectService = projectService
	}

	ngOnInit() {
	  this.project = {}
	  this.route.params.subscribe(params => {
	    this.projectService.getProject(params.id)
	        .then(project => this.project = project)
	        .catch(e => console.log(e));
	  });
	}

	onSubmit() {
	    this.projectService.addMilestone(this.project._id, this.data)
	    	.then(project => this.project = project)
	        .catch(e => console.log(e));
	    this.data = {}
	  }
}

MilestoneComponent.parameters = [
  ActivatedRoute, ProjectService
]