import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class EpicService {
	
	constructor(http) {
      this.http = http
    }

    getEpic(id) {
      	return this.http.get(`/epics/${id}`)
              .toPromise()
              .then(response => response.json())
    }

    addComment(id, comment) {
      return this.http.post(`/epics/${id}/comments`, JSON.stringify(comment), { headers:{'Content-Type': 'application/json'}})
        .toPromise()
        .then(response => response.json())
        .catch(err => console.log(err))
    }

    addTask(id, task) {
      return this.http.post(`/epics/${id}/tasks`, JSON.stringify(task), { headers:{'Content-Type': 'application/json'}})
        .toPromise()
        .then(response => response.json())
        .catch(err => console.log(err))
    }
}

EpicService.parameters = [
  Http
]