import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { EventBusService } from '../common/services/event-bus.service';
import { User } from '../models/user-model';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  private toggleBtnStatus: boolean = false;
  public showTopMenu: boolean = false;
  public currentUser: User;
  public newMsg: number = 0;
  public isLoading: boolean = false;

  constructor(
    // private elementRef: ElementRef,
    private eventBusService: EventBusService,
    private loginService: LoginService,
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public onTogglerClick(event): void {
    this.toggleBtnStatus = !this.toggleBtnStatus;
    this.eventBusService.topToggleBtn.next(this.toggleBtnStatus);
  }

  public doLogout() {
    this.loginService.logout();
    this.router.navigateByUrl('login');
    // console.log('--------succees logout!-----------');
  }

  goPersonalInfo() {
    this.showTopMenu = false;
    this.router.navigateByUrl('/workspace/info/personal');
  }

  goMsg() {
    this.showTopMenu = false;
    this.router.navigateByUrl('/workspace/info/msg');
  }

  openOrClose() {
    this.showTopMenu = !this.showTopMenu;
    if (this.showTopMenu) {
      this.isLoading = true;
      this.http.get('/mock-data/msg-uid-1871239223.json')
      .subscribe(
        data => {
          this.newMsg = data.json().numbers;
          this.isLoading = false;
        },
        error => console.log(error)
      );
    }
  }

  fuck(n: number): boolean {
    return Boolean(n);
  }

}
