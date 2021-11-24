import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from "./footer/footer.component"
import { HeaderComponent } from "./header/header.component"
import { MenuComponent } from './popover/menu/menu.component';
import { PostComponent } from './post/post.component';


@NgModule({
    imports: [CommonModule, IonicModule.forRoot()],
    declarations: [HeaderComponent, FooterComponent, PostComponent, MenuComponent],
    exports: [HeaderComponent, FooterComponent, CommonModule, FormsModule]
})
export class SharedModule { }