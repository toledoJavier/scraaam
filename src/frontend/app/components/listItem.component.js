import { Component } from '@angular/core';

@Component({
  selector: 'list-item',
  inputs: ['data', 'listHeading', 'showProperty'],
  template: `<div class="panel panel-info">
				<!-- Default panel contents -->
				<div class="panel-heading">{{listHeading}}<div class="pull-right text-muted">{{data?.length}} {{listHeading}}</div></div>
				<!-- List group -->
				<ul class="list-group">
				<li class="list-group-item" *ngFor="let item of data">
					{{getProperty(item, showProperty)}}
				</li>
				</ul>
			</div>`
})

export default class ListItemComponent {
	getProperty(item, property) {
		return item[property]
	}
}