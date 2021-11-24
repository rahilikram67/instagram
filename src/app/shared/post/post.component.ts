import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, NavController, Platform, PopoverController } from '@ionic/angular';
import { MenuComponent } from '../popover/menu/menu.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() username: any;
  @Input() thumbnail: any;
  @Input() url: any;
  @Input() likes: string
  constructor(
    private popoverController: PopoverController,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private nav: NavController
  ) { }

  ngOnInit() {
    console.log(this.username)
  }
  handleLike(ev: Event) {
    if (ev.target["name"].includes("-outline")) {
      ev.target["name"] = ev.target["name"].replace("-outline", "")
      this.likes = String(Number(this.likes.replace(",", "")) + 1).match(/\w{3}/g).join(",")
    }
    else {
      ev.target["name"] = ev.target["name"] + "-outline"
      this.likes = String(Number(this.likes.replace(",", "")) - 1).match(/\w{3}/g).join(",")
    }
  }
  inputChange(ev: Event) {
    var btn = ev.target["parentElement"]["parentElement"].children[1]
    if (ev.target["value"] != "") {
      btn.style.visibility = "visible"
    }
    else btn.style.visibility = "hidden"
  }
  // ionic present popover
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: MenuComponent,
      animated: false,
      cssClass: ["custom"],
      componentProps: { url: this.url }
    })
    await popover.present()
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share to...',
      cssClass: 'action-text',
      buttons: [{
        text: 'Share on Twitter',
        icon: 'logo-twitter',
        handler: () => {
          window.open('https://twitter.com/share?url=' + this.url, '_blank');
        }
      },
      {
        text: 'Share on Facebook',
        icon: 'logo-facebook',
        handler: () => {
          window.open('https://www.facebook.com/sharer/sharer.php?u=' + this.url, '_blank');
        }
      },
      {
        text: 'Share on Instagram',
        icon: 'logo-instagram',
        handler: () => {
          window.open('https://www.instagram.com/create/select/', '_blank');
        }
      },
      {
        text: 'Share on TikTOk',
        icon: 'logo-tiktok',
        handler: () => {
          window.open('https://www.tiktok.com/upload', '_blank');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.actionSheetController.dismiss()
        }
      }]
    });

    await actionSheet.present();
  }

  handlePostClick(ev: Event) {
    if (this.platform.is("mobile")) this.presentActionSheet()
    else this.presentPopover()
  }

  details() {
    this.nav.navigateForward([`/${this.username}`, { thumbnail: this.thumbnail }])
  }


}
