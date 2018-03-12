import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ApplyAct } from '../../models/apply-model';

@Injectable()
export class ApplyActService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  apply(value: FormData) {
    let headers = new Headers({'Content-Type': undefined});
    return this.http.post("http://192.168.148.6/upload", value)
    .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
  }).subscribe(
      data => {
        if (data.json().sysinfo.fileAccepted) {
          alert("上传成功!");
          this.router.navigateByUrl('workspace/act/activities');
        }else {
          alert("上传文件失败 请重试!");
        }
      },
      error => console.log(error)
    );
  }

}
