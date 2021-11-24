import { Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { IonContent } from '@ionic/angular';
import { PostComponent } from '../shared/post/post.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild("posts", { read: ViewContainerRef }) posts: ViewContainerRef
  pages = { user: 1, image: 3 }
  hide_spinner = 'display: none !important'
  constructor(private http: HttpClient, private resolver: ComponentFactoryResolver, private injector: Injector) { }
  async ngOnInit() {
    await this.getData()
  }
  async getData() {
    this.hide_spinner = 'display: block !important'
    var data = await this.http.get(`https://randomuser.me/api/?page=${this.pages.user}&results=1&seed=feed`).toPromise()
    for (let res of data['results']) {
      let el = this.resolver.resolveComponentFactory(PostComponent)
      let ref = this.posts.createComponent(el, null, this.injector)
      ref.instance.thumbnail = res.picture.thumbnail
      ref.instance.username = res.login.username
      ref.instance.url = await this.getRand()
      ref.instance.likes = this.getLikes()
    }
    this.pages.user++
    this.hide_spinner = 'display: none !important'
  }



  getRand() {
    var xml = new XMLHttpRequest();
    xml.open("GET", "https://picsum.photos/600/600", true);
    xml.send();
    return new Promise(resolve => {
      xml.onload = () => resolve(xml.responseURL);
    })
  }

  getLikes() {
    var likes = String(Math.floor(Math.random() * (10000000 - 10) + 10))
    return likes.match(/\w{3}/g).join(",")
  }

}
