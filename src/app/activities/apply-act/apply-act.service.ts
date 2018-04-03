import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ApplyAct } from '../../models/apply-model';
import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';

@Injectable()
export class ApplyActService {

  public currentUser: User;
  public uploadOk: boolean = false;

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  upload(value: FormData) {
    let headers = new Headers({'Content-Type': undefined});
    return this.http.post("http://192.168.148.6/upload", value)
    .subscribe(
      data => {
        if (data.json().sysinfo.fileAccepted) {
          alert("上传成功!");
          this.uploadOk = true;
        }else {
          alert("上传文件失败 请重试!");
          this.uploadOk = false;
        }
      },
      error => console.log(error)
    );
  }

}
