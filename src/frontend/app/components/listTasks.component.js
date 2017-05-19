import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EpicService from '../services/epic.service';

@Component({
  selector: 'list-tasks',
  inputs: ['data'],
  template: `<div class="panel panel-info">
				<!-- Default panel contents -->
				<div class="panel-heading">Tasks<div class="pull-right text-muted">{{data.tasks?.length}} Tasks</div></div>
				<!-- List group -->
				<ul class="list-group">
				<li class="task-item list-group-item" *ngFor="let task of data.tasks">
					{{task.description}}
		        <span class="pull-right">
			        <button class="delete-task btn btn-xs btn-warning" (click)="delete(task)">
			          <span class="glyphicon glyphicon-trash"></span>
			        </button>
		        </span>
				</li>
				</ul>
			</div>
			<input [(ngModel)]="newTask.description" type="text" class="form-control" placeholder="Descripción" name="description">
			<button class="createTaskButton btn btn-primary navbar-btn" type="button" (click)="onSubmit()">Crear Task</button>`
})

export default class ListTasksComponent {
	constructor(route, epicService) {
		this.newTask = {}
		this.data = {}
		this.epicService = epicService
	}

	onSubmit() {
	    this.epicService.addTask(this.data._id, this.newTask)
	    	.then(epic => this.data  = epic)
	        .catch(e => console.log(e));
	    this.newTask = {}
	}

	delete(task) {
		this.epicService.deleteTask(this.data._id, task._id)
	    	.then(epic => this.data = epic)
	        .catch(e => console.log(e));
	}
}

ListTasksComponent.parameters = [
  ActivatedRoute, EpicService
]