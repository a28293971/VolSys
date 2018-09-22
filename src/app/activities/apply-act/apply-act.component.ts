import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import { User } from '../../models/user-model';
import { ApplyAct } from '../../models/apply-model';
import { ApplyActService } from './apply-act.service';

@Component({
  selector: 'apply-act',
  templateUrl: './apply-act.component.html',
  styleUrls: ['./apply-act.component.scss'],
  animations: [
    flyIn
  ]
})
export class ApplyActComponent implements OnInit {

  public act: ApplyAct = new ApplyAct();
  public currentUser: User;
  public tmp: File;
  public selectItem: string;
  public selectMenu = [
    {
      id: '2740',
      name: '计算机科学与技术学院'
    }/* ,
    {
      id: '2333',
      name: '商学院'
    } */
  ];

  constructor(
    private applyActService: ApplyActService
  ) { }

  ngOnInit() {
    this.selectItem = "";
    this.currentUser = this.applyActService.currentUser;
  }

  fuck(event) {
    this.tmp = event.target.files[0];
  }

/*   upload() {
    let formData = new FormData();
    formData.append("enctype", "multipart/form-data");
    formData.append("id", this.currentUser.id.toString());
    formData.append("file", this.act.other);
    this.applyActService.upload(formData);
  } */

/*   apllyAct() {
    this.act.college = this.selectItem;
    this.applyActService.apply(this.act)
  } */

  /* apllyAct() {
    if (new Date(this.act.start) > new Date(this.act.end)) {
      alert('起始时间必须大于结束时间！');
      return;
    }
    let formData = new FormData();
    // formData.append("enctype", "multipart/form-data");
    formData.append("id", this.currentUser.id.toString());
    formData.append("file", this.tmp);
    formData.append('eid', )
    this.applyActService.upload(formData)
    .subscribe(
      data => {
        if (data.json().sysinfo.fileAccepted) {
          this.act.college = this.selectItem;
          this.applyActService.apply(this.act);
        }else {
          alert("上传文件失败 请重试!");
        }
      },
      error => console.log(error)
    );
  } */

  apllyAct() {
    if (new Date(this.act.start) > new Date(this.act.end)) {
      alert('起始时间必须大于结束时间！');
      return;
    }
    this.act.college = this.selectItem;
    this.applyActService.apply(this.act)
    .subscribe(
      data => {
        let res = data.json();
        if (res.sysinfo.auth) {
          let formData = new FormData();
          formData.append("id", this.currentUser.id.toString());
          formData.append("file", this.tmp);
          formData.append('eid', res.data.eid);
          this.applyActService.upload(formData);
        }else {
          alert('活动创建失败 请重试');
        }
      },
      error => console.log(error)
    );
  }

  // fileWork(event) {
  //   let formData = new FormData();
  //   formData.append("enctype", "multipart/form-data");
  //   formData.append("id", this.currentUser.id.toString());
  //   formData.append("file", event.target.files[0]);
  //   formData.append("token", this.currentUser.token);
  //   this.applyActService.apply(formData);
  // }

}
