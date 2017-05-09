import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import AppComponent from './app/components/app.component'
import ExampleComponent from './app/components/example.component'
import NavbarComponent from './app/components/navbar.component'
import NewProjectComponent from './app/components/newProject.component'
import MilestoneComponent from './app/components/milestone.component'
import DetailMilestoneComponent from './app/components/detailMilestone.component'
import EpicComponent from './app/components/epic.component'
import DetailEpicComponent from './app/components/detailEpic.component'
import ListItemComponent from './app/components/listItem.component'

import { RouterModule }  from '@angular/router';

let router = RouterModule.forRoot([
  { path: '', redirectTo: '/proyectos', pathMatch: 'full' },
  { path: 'proyectos', component: NewProjectComponent },
  { path: 'proyecto/:id', component: MilestoneComponent },
  { path: 'epic/:id', component: DetailEpicComponent }
], { useHash: true })

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule ],
  declarations: [
    AppComponent,
    ExampleComponent,
    NavbarComponent,
    NewProjectComponent,
    MilestoneComponent,
    DetailMilestoneComponent,
    EpicComponent,
    DetailEpicComponent,
    ListItemComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)