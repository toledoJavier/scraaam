import { Component } from '@angular/core';

import ProjectService from '../services/project.service';

@Component({
  selector: 'navbar',
  template: `<nav>
			    <ul>
			        <li><a href="/">Scraaam</a></li>
			        <li>
			      <a>Proyectos <span class="caret"></span></a>
			            <div>
			            	<div *ngFor="let item of projects">
			            		<ul><li><a [routerLink]="['/proyecto', item._id]">{{item.name}}</a></li></ul>
			            	</div>
			            	<hr>
			                <ul>
			                    <li><a href="/">Crear...</a><li>
			                </ul>
			            </div>
			        </li>
			    </ul>
			</nav>`
})

export default class NavbarComponent {
	constructor(projectService) {
		this.simpleValue = "Proyecto..."
		this.selected = null;
    	this.projects = projectService.projects;
  	}
}

NavbarComponent.parameters = [
  ProjectService
]