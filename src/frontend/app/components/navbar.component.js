import { Component } from '@angular/core';

import ProjectService from '../services/project.service';

@Component({
  selector: 'navbar',
  template: `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Scraaam</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Proyectos <span class="caret"></span></a>
          <ul class="dropdown-menu">
          	<li class="project" *ngFor="let item of projects"><a [routerLink]="['/proyecto', item._id]">{{item.name}}</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Crear Proyecto</a></li>
          </ul>
        </li>
      </ul>
    
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>`
})

export default class NavbarComponent {
	constructor(projectService) {
		this.simpleValue = "Proyecto..."
    	this.projects = projectService.projects;
  	}
}

NavbarComponent.parameters = [
  ProjectService
]