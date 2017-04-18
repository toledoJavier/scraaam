import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProjectService from '../services/project.service';
import MilestoneService from '../services/milestone.service';

@Component({
  selector: 'milestone',
  template: `<h3><span class="span-page">{{project.name}} | Milestones </span></h3>
  			<hr>
  			<section class="container">
			  <div class="left-half">
			    <article>
			      <detail-milestone [data]="selectedMilestone"></detail-milestone>
			    </article>
			  </div>
			  <div class="right-half">
			    <article>
			      	<h2>Milestones</h2>
				    <div class="milestone-list" *ngFor="let item of project.milestones" (click)="selectMilestone(item)">
				    	{{item.name}}
				    </div>
					<input [(ngModel)]="data.name" placeholder="Nombre" name="name">
					<button type="button" (click)="onSubmit()">Crear</button>
			    </article>
			  </div>
			</section>`
})

export default class MilestoneComponent {
	constructor(route, projectService, milestoneService) {
		this.selectedMilestone = {}
		this.data = {}
		this.route = route
		this.projectService = projectService
		this.milestoneService = milestoneService
	}

	ngOnInit() {
		this.selectedMilestone = {}
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

	selectMilestone(milestone) {
		this.milestoneService.getMilestone(milestone._id)
			.then(response => this.selectedMilestone = response)
	        .catch(e => console.log(e));
	}
}

MilestoneComponent.parameters = [
  ActivatedRoute, ProjectService, MilestoneService
]