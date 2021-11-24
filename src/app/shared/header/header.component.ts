import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  handleClick(ev: Event) {
    var childs = Array.from(ev.target["parentElement"].children)
    childs.forEach(element => {
      if (!element["name"].includes("-outline")) element["name"] = element["name"] + "-outline"
    });
    var splits = ev.target["name"].split("-")
    ev.target["name"] = (splits.length > 2) ? `${splits[0]}-${splits[1]}` : splits[0]
  }
}
