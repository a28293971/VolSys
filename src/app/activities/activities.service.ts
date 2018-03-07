import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ActivityService {

    constructor(private http: Http) {}

    getActivities() {
        let token = JSON.parse(localStorage.getItem('currentUser')).token;
        return this.http.post('http://192.168.148.6/list-all-event', JSON.stringify({token: token}));
    }
}
