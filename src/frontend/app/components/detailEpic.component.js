import { Component, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import EpicService from '../services/epic.service';

@Component({
  selector: 'detail-epic',
  styleUrls: ['./assets/styles.css'],
  template: `<div class="container"><div class="panel-with-margin panel panel-default">
					<div class="row">
		    			<div class="col-sm-6">
		    				{{epic.description}}
		    				<hr>
							<div class="panel panel-info">
								<!-- Default panel contents -->
								<div class="panel-heading">Comentarios<div class="pull-right text-muted">{{epic.comments?.length}} Comentarios</div></div>
								<!-- List group -->
								<ul class="list-group">
								<li class="list-group-item" *ngFor="let item of epic.comments">
									{{item.body}}
								</li>
								</ul>
							</div>
							<input type="text" class="form-control" [(ngModel)]="newComment.body" placeholder="Comentario" name="comment">
							<button class="btn btn-primary navbar-btn" type="button" (click)="comment()">Comentar</button>
						</div>						
						<div class="col-sm-6">
							<div class="panel panel-info">
								<!-- Default panel contents -->
								<div class="panel-heading">Tasks<div class="pull-right text-muted">{{epic.tasks?.length}} Tasks</div></div>
								<!-- List group -->
								<ul class="list-group">
								<li class="list-group-item" *ngFor="let item of epic.tasks">
									{{item.description}}
								</li>
								</ul>
							</div>
							<input [(ngModel)]="data.description" type="text" class="form-control" placeholder="Descripción" name="description">
							<button class="btn btn-primary navbar-btn" type="button" (click)="onSubmit()">Crear Tarea</button>
						</div>
					</div>
				</div>
			</div>`
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