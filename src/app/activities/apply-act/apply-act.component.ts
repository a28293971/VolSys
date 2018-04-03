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

  act: ApplyAct = new ApplyAct();
  currentUser: User;
  selectItem: string;
  selectMenu = [
    {
      id: '2740',
      name: '计算机科学与技术学院'
    },
    {
      id: '2333',
      name: '商学院'
    }
  ];

  constructor(
    private applyActService: ApplyActService
  ) { }

  ngOnInit() {
    this.selectItem = "";
    this.currentUser = this.applyActService.currentUser;
  }

  upload() {
    let formData = new FormData();
    formData.append("enctype", "multipart/form-data");
    formData.append("id", this.currentUser.id.toString());
    formData.append("file", this.act.other);
    this.applyActService.upload(formData);
  }

/*   apllyAct() {
    this.act.college = this.selectItem;
    this.applyActService.apply(this.act)
  } */

  apllyAct() {
    let formData = new FormData();
    formData.append("enctype", "multipart/form-data");
    formData.append("id", this.currentUser.id.toString());
    formData.append("file", this.act.other);
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
