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

}

MilestoneService.parameters = [
  Http
]