import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProjectService from '../services/project.service';

@Component({
  selector: 'new-milestone',
  template: `<div class="right-wrapper">
  			<div id="right">
			    <h3>Milestones</h3>
			    <div *ngFor="let item of project.milestones">
			    {{item.name}}
			    </div>
				<input [(ngModel)]="data.name" placeholder="Nombre" name="name">
				<button type="button" (click)="onSubmit()">Crear</button>
			</div>
			</div>`
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