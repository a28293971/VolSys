import { Component, OnInit } from '@angular/core';

import { ChangePwdService } from './change-pwd.service';

@Component({
  selector: 'change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {
  public pwd1: string;
  public pwd2: string;
  public dffrentInput: boolean = false;

  constructor(
    private changePwdService: ChangePwdService
  ) { }

  ngOnInit() {
  }

  public changePwd() {
    if (this.pwd1 !== this.pwd2) {
      this.dffrentInput = true;
      return;
    }
    this.changePwdService.sendNewPassword(this.pwd1)
    .subscribe(
      data => {
        alert('密码修改成功!');
        this.changePwdService.router.navigateByUrl('/workspace/info/personal');
      },
      error => console.log(error)
    );
  }

}
