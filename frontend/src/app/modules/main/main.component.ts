import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from 'src/app/template/header/header.component';
import { FooterComponent } from 'src/app/template/footer/footer.component';
import { SidebarComponent } from 'src/app/template/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  screenSize: number;
  iscomp = true;

  @HostListener('window:resize', [])
  onResize() {
    const screenWidth = window.innerWidth;
    this.screenSize = screenWidth;
    if (this.screenSize >= 1035) {
      this.iscomp = true;
    } else {
      this.iscomp = false;
    }
  }

  ngOnInit() {
    const screenWidth = window.innerWidth;
    this.screenSize = screenWidth;
    if (this.screenSize >= 1035) {
      this.iscomp = true;
    } else {
      this.iscomp = false;
    }
  }
}
