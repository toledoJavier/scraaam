import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class MilestoneService {
	
	  constructor(http) {
      this.http = http
    }

    getMilestone(id) {
      return this.http.get(`/milestones/${id}`)
              .toPromise()
              .then(response => response.json())
    }

    addEpic(id, epic) {
      return this.http.post(`/milestones/${id}/epics`, JSON.stringify(epic), { headers:{'Content-Type': 'application/json'}})
        .toPromise()
        .then(response => response.json())
        .catch(err => console.log(err))
    }
}

MilestoneService.parameters = [
  Http
]