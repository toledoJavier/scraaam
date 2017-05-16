import { Component } from '@angular/core';

import ProjectService from '../services/project.service';

@Component({
  selector: 'new-project',
  template: `Crear Proyecto:
            <div class="form-group row">
              <div class="col-xs-4">
                <input type="text" class="form-control" [(ngModel)]="data.name" placeholder="Titulo" name="title">
                <button type="button" class="createProjectButton btn btn-primary navbar-btn" (click)="onSubmit()">Crear Proyecto</button>
              </div>
            </div>`
})

export default class NewProjectComponent {
	constructor(projectService) {
		this.data = {}
		this.projectService = projectService
  	}

  	onSubmit() {
	    this.projectService.create(this.data)
	    this.data = {}
	}
}

NewProjectComponent.parameters = [
  ProjectService
]