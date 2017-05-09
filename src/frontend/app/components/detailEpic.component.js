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
							<list-item [data]="epic.comments" [listHeading]="'Comentarios'" [showProperty]="'body'"></list-item>
							<input type="text" class="form-control" [(ngModel)]="newComment.body" placeholder="Comentario" name="comment">
							<button class="btn btn-primary navbar-btn" type="button" (click)="comment()">Comentar</button>
						</div>						
						<div class="col-sm-6">
							<list-item [data]="epic.tasks" [listHeading]="'Tasks'" [showProperty]="'description'"></list-item>
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