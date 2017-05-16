import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import ProjectService from '../services/project.service';
import MilestoneService from '../services/milestone.service';

@Component({
  selector: 'milestone',
  styleUrls: ['./assets/styles.css'],
  template: `<h3><span class="selectedSpan span-page">{{project.name}} | Milestones </span></h3>
  			<hr>
  			<div class="container">
		    	<div class="panel-with-margin panel panel-default">
		    		<div class="row">
		    			<div class="col-sm-6">
					    	<div class="panel panel-info">
							  <!-- Default panel contents -->
							  <div class="panel-heading">Milestones<div class="pull-right text-muted">{{project.milestones?.length}} Milestones</div></div>
							  <!-- List group -->
							  <ul class="list-group">
							    <li class="list-group-item" *ngFor="let item of project.milestones" (click)="selectMilestone(item)">
							    	{{item.name}}
							    </li>
							  </ul>
							</div>
							<div class="form-group row">
		              			<div class="col-xs-4">
									<input type="text" class="form-control" [(ngModel)]="data.name" placeholder="Nombre" name="name">
									<button  class="btn btn-primary navbar-btn" type="button" (click)="onSubmit()">Crear Milestone</button>
								</div>
							</div>
						</div>
		    			<div class="col-sm-6">
		    				<div class="panel-empty panel panel-default" *ngIf="!milestoneIsSelected">
		    					<h2 class="text-muted">Seleccionar un milestone para administrarlo.</h2>
				    		</div>
				    		<div *ngIf="milestoneIsSelected">
					    		<detail-milestone [data]="selectedMilestone"></detail-milestone>
					    	</div>
				    	</div>
					</div>
				</div>
			</div>`
})

export default class MilestoneComponent {
	constructor(route, projectService, milestoneService) {
		this.selectedMilestone = {}
		this.milestoneIsSelected = false;
		this.data = {}
		this.route = route
		this.projectService = projectService
		this.milestoneService = milestoneService
	}

	ngOnInit() {
		this.selectedMilestone = {}
		this.milestoneIsSelected = false;
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
			.then(response => {
				this.selectedMilestone = response
				this.milestoneIsSelected = true;})
	        .catch(e => console.log(e));
	}
}

MilestoneComponent.parameters = [
  ActivatedRoute, ProjectService, MilestoneService
]