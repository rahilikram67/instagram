import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  url: string = ""
  btns = [
    {
      text: 'Share on Twitter',
      icon: 'logo-twitter',
    },
    {
      text: 'Share on Facebook',
      icon: 'logo-facebook',
    },
    {
      text: 'Share on Instagram',
      icon: 'logo-instagram',
    },
    {
      text: 'Share on TikTok',
      icon: 'logo-tiktok',
    },
  ]
  constructor(private popoverController: PopoverController, private params: NavParams) {
    this.url = this.params.data.url
  }

  ngOnInit() { }

  closePopover() {
    this.popoverController.dismiss();
  }
  share(icon: String) {
    if (icon.includes('facebook')) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + this.url, '_blank');
    }
    else if (icon.includes('twitter')) {
      window.open('https://twitter.com/share?url='+this.url, '_blank');
    }
    else if (icon.includes('instagram')) {
      window.open('https://www.instagram.com/create/select/', '_blank');
    }
    else if (icon.includes('tiktok')) {
      window.open('https://www.tiktok.com/upload', '_blank');
    }
  }
}
