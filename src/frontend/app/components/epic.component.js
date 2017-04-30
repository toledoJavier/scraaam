import { Component, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import MilestoneService from '../services/milestone.service';

@Component({
  selector: 'epic',
  inputs: ['data'],
  outputs: ['updateMilestoneEvent'],
  styleUrls: ['./assets/styles.css'],
  template: `<div class="panel panel-info">
			  <!-- Default panel contents -->
			  <div class="panel-heading">Epics</div>
			  <!-- List group -->
			  <ul class="list-group">
			    <li class="list-group-item" *ngFor="let item of data.epics; let i = index" [attr.data-index]="i" [routerLink]="['/epic', item._id]">
			    	Epic {{i + 1}}: {{item.description}}
			    </li>
			  </ul>
			</div>
			<div class="form-group row">
      			<div class="col-xs-8">
					<input type="text" class="form-control" [(ngModel)]="newEpic.description" placeholder="Descripción" name="description">
					<button  class="btn btn-primary navbar-btn" type="button" (click)="onSubmit()">Crear Epic</button>
				</div>
			</div>`
})

export default class EpicComponent {
	constructor(route, milestoneService) {
		this.updateMilestoneEvent = new EventEmitter()
		this.newEpic = {}
		this.route = route
		this.milestoneService = milestoneService
	}

	onSubmit() {
	    this.milestoneService.addEpic(this.data._id, this.newEpic)
	    	.then(milestone => {
	    		this.data = milestone
	    		this.updateMilestoneEvent.next(this.data)
	    	})
	        .catch(e => console.log(e));
	    this.newEpic = {}
	}
}

EpicComponent.parameters = [
  ActivatedRoute, MilestoneService
]