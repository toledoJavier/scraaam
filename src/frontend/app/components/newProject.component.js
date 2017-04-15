import { Component } from '@angular/core';

import ProjectService from '../services/project.service';

@Component({
  selector: 'new-project',
  template: `Crear Proyecto:
            <form>
              <input [(ngModel)]="data.name" placeholder="Titulo" name="title">
              <button type="button" (click)="onSubmit()">Crear Proyecto</button>
            </form>`
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