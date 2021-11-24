import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  tabs = []
  constructor() {

  }

  ngOnInit() {
    this.tabs = [
      document.getElementById("hometab"),
      document.getElementById("searchtab"),
      document.getElementById("addtab"),
      document.getElementById("liketab"),
      document.getElementById("profiletab"),
    ]
  }
  handleTab(n: number) {
    for (let element of this.tabs) {
      let el = element
      if (!el["name"].includes("-outline")) el["name"] = el["name"] + "-outline"
    }

    this.tabs[n]["name"] = this.tabs[n]["name"].replace("-outline", "")

  }

}
