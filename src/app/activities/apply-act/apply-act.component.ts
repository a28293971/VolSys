import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
// import { FileUploader, FileItem } from 'ng2-file-upload';

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
  public fileHadSelected: boolean = false;
  // private tmpFile: FileItem;
  public selectItem: string;
  public selectMenu = [
    {
      id: '274',
      name: '计算机科学与技术学院'
    }/* ,
    {
      id: '2333',
      name: '商学院'
    } */
  ];
/*   public uploader: FileUploader = new FileUploader({
    url: '/volunteer/upload',
    method: 'POST',
    itemAlias: 'file',
    autoUpload: false,
    allowedFileType: ['image']
  }); */

  constructor(
    private applyActService: ApplyActService
  ) { }

  ngOnInit() {
    this.selectItem = "";
    this.currentUser = this.applyActService.currentUser;
    // this.uploader.setOptions({additionalParameter: {'id': this.currentUser.id.toString()}});
/*     this.uploader.onAfterAddingFile = (file: FileItem) => {
      console.log('ADD FILE');
      this.fileHadSelected = true;
      this.tmpFile = file;
      this.tmpFile.onSuccess = (res, status, header) => {
        console.log('i had been call');
        if (status === 200) {
          this.applyActService.afterUpload(res);
        }else {
          console.error('fail to upload the file');
        }
      };
      console.log(this.tmpFile);
      // console.log(!this.tmpFile);
      // console.log(!!this.tmpFile);
    }; */
  }

  fuck(event) {
    this.tmp = event.target.files[0];
    this.fileHadSelected = true;
  }

  upload() {
    let formData = new FormData();
    formData.append("enctype", "multipart/form-data");
    formData.append("id", this.currentUser.id.toString());
    formData.append("file", this.act.other);
    this.applyActService.upload(formData);
  }

  apllyAct() {
    if (new Date(this.act.start) > new Date(this.act.end)) {
      alert('起始时间必须大于结束时间！');
      return;
    }

    /* requestAnimationFrame(() => {
      alert('活动开始创建 请等待文件上传');
    }); */
    setTimeout(() => alert('活动开始创建,请等待文件上传完成提示,具体时间依据您自身网速'), 0);

    this.act.college = this.selectItem;
    this.applyActService.apply(this.act)
    .subscribe(
      data => {
        let res = data.json();
        if (res.sysinfo.auth) {
          let formData = new FormData();
          formData.append("id", this.currentUser.id.toString());
          formData.append('eid', res.data.eid);
          formData.append("file", this.tmp);
          this.applyActService.upload(formData);
/*           this.uploader.setOptions({additionalParameter: {
            'eid': res.data.eid,
            'id': this.currentUser.id.toString()
          }});
          this.uploader.uploadItem(this.tmpFile); */
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
