import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import millify from "millify"
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  person: any = {}
  influence = { posts: "", followers: "", following: "" }
  images = []
  page = 2
  constructor(private active: ActivatedRoute, private http: HttpClient) {
    this.person["user"] = this.active.snapshot.paramMap.get("id")
    this.person["image"] = this.active.snapshot.params["thumbnail"]

  }

  async ngOnInit() {
    this.getInfluence()
    await this.getImages()
  }

  getInfluence() {
    let posts = Math.floor(Math.random() * 10000)
    let foll = Math.floor(Math.random() * 10000)
    let folling = Math.floor(Math.random() * 10000)
    this.influence.posts = String(posts).match(/\w{3}/g).join(",")
    this.influence.followers = millify(foll, { precision: 1, units: ['', "k", "m", "tr"], space: false })
    this.influence.following = millify(folling, { precision: 1, units: ['', "k", "m", "tr"], space: false })
  }

  async getImages() {
    var data = await this.http.get(`https://picsum.photos/v2/list/?page=${this.page}&limit=20`).toPromise()
    for (let res of data as any) {
      this.images.push(res.download_url)
    }
    this.page++
  }

}
