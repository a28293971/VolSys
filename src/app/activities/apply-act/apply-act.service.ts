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
    // let headers = new Headers({'Content-Type': 'multipart/form-data'});
    return this.http.post("/volunteer/upload", value)
    .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    });
  }

/*   afterUpload(res) {
    let data = JSON.parse(res);
    if (data.sysinfo.tokenUpdate) {
      this.router.navigateByUrl('login');
    }else {
      if (data.sysinfo.fileAccepted) {
        alert("活动申请成功!");
        this.router.navigateByUrl('workspace/act/activities');
      }else {
        alert("活动申请失败 文件上传失败 请重试!");
      }
    }
  } */

  apply(act: ApplyAct) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      name: this.currentUser.name,
      college: act.college,
      ename: act.ename,
      start: act.start,
      end: act.end,
      volunteer_time: act.volunteer_time,
      description: act.description,
      token: this.currentUser.token
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/create-personal-event', body, {headers: headers})
    .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    })
  }

}
