import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class MsgService {

  constructor(
    private http: Http
  ) { }

  getMsgList(page: number = 1) {
    return this.http.get('/mock-data/msg-uid-1871239223.json');
  }

}
