import chai from "chai"

chai.should()

import { By } from "@angular/platform-browser"
import { TestBed } from "@angular/core/testing"

import ListItemComponent from "../../../../src/frontend/app/components/listItem.component"

describe("ListItemComponent", () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent ]
    });
    fixture = TestBed.createComponent(ListItemComponent)
    const comment = {
    	body: "Some comment body"
    }
    fixture.componentInstance.data = [comment]
    fixture.componentInstance.listHeading = "Comentarios"
    fixture.componentInstance.showProperty = "body"

    fixture.detectChanges()
  })

  it("Should display Comentarios as panel heading", () => {
    const panelContainer = fixture.debugElement.query(By.css(".panel-heading")).nativeElement
    panelContainer.innerHTML.should.have.string("Comentarios")
  })

  it("Should display the comment body", () => {
    const commentContainer = fixture.debugElement.query(By.css(".list-group-item")).nativeElement
    commentContainer.innerHTML.should.have.string("Some comment body")
  })
})