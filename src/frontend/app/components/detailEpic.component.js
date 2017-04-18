import { Component, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import EpicService from '../services/epic.service';

@Component({
  selector: 'detail-epic',
  template: `<section class="container">
			  <div class="left-half">
			    <article>
			    	{{epic.description}}
			    	<h2>Comentarios</h2>
			    	<br>
			    	<div class="milestone-list" *ngFor="let item of epic.comments">
				    	{{item.body}}
				    </div>
			    	<input [(ngModel)]="newComment.body" placeholder="Comentario" name="comment">
					<button type="button" (click)="comment()">Comentar</button>
			    </article>
			  </div>
			  <div class="right-half">
			    <article>
			      	<h2 class="milestones-title">Tasks</h2>
				    <div class="milestone-list" *ngFor="let item of epic.tasks">
				    	{{item.description}}
				    </div>
					<input [(ngModel)]="data.description" placeholder="Descripción" name="description">
					<button type="button" (click)="onSubmit()">Crear Tarea</button>
			    </article>
			  </div>
			</section>`
})

export default class DetailEpicComponent {
	constructor(route, epicService) {
		this.newComment = {}
		this.data = {}
		this.epic = {} 
		this.route = route
		this.epicService = epicService
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
	    this.epicService.getEpic(params.id)
	        .then(epic => this.epic = epic)
	        .catch(e => console.log(e));
	  });
	}

	comment() {
	    this.epicService.addComment(this.epic._id, this.newComment)
	    	.then(epic => this.epic = epic)
	        .catch(e => console.log(e));
	    this.newComment = {}
	}

	onSubmit() {
	    this.epicService.addTask(this.epic._id, this.data)
	    	.then(epic => this.epic = epic)
	        .catch(e => console.log(e));
	    this.data = {}
	}
}

DetailEpicComponent.parameters = [
  ActivatedRoute, EpicService
]