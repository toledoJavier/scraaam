import { Component, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import MilestoneService from '../services/milestone.service';

@Component({
  selector: 'epic',
  inputs: ['data'],
  outputs: ['updateMilestoneEvent'],
  template: `<h3 class="epics-title">Epics</h3>
  			<div class="epics-list" *ngFor="let item of data.epics; let i = index" [attr.data-index]="i" [routerLink]="['/epic', item._id]">
		    	Epic {{i + 1}}: {{item.description}}
		    </div>
		    <br>
		    <div>
			    <input [(ngModel)]="newEpic.description" placeholder="Descripción" name="description">
				<button type="button" (click)="onSubmit()">Crear Epic</button>
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