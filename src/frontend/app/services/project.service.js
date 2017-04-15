import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class ProjectService {

	constructor(http) {
      this.http = http
      this._projects = []
      this.http.get("/proyectos").toPromise()
              .then(response => this._projects.push(...response.json()))
              .catch(err => console.log(err))
    }

    get projects() {
      return this._projects
    }
    
    getProject(id) {
      return this.http.get(`/proyectos/${id}`).toPromise()
              .then(response => response.json());
    }

    create(project) {
      this.http.post("/proyectos", JSON.stringify(project), { headers:{'Content-Type': 'application/json'}})
              .toPromise()
              .then(response => this._projects.push(project))
              .catch(err => console.log(err))
    }
}

ProjectService.parameters = [
  Http
]