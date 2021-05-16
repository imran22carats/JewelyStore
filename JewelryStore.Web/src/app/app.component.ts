import { Component } from '@angular/core';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JewelryStore';
  isShowTopBar = false;
  userRole = '';
  constructor(private appService: AppService) {

    this.appService.loginEmitter.subscribe((response: any) => {
      console.log('response', response);
      setTimeout(() => {
        if (response) {
          this.isShowTopBar = true;
          this.userRole = sessionStorage.getItem('role');
        } else {
          this.isShowTopBar = false;
          this.userRole = '';
        }
      }, 100);
    });
  }
}
