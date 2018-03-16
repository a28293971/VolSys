import { Injectable } from '@angular/core';
/* import { Http, Headers } from '@angular/http'
import { User } from '../models/user-model'; */

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public isAdmin: boolean = false;

/*     constructor(
        private http: Http
    ) {}

    init() {
        const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const body = JSON.stringify({
                id: currentUser.id,
                token: currentUser.token
            });
            this.http.post("http://192.168.148.6/login", body,
            {headers: new Headers({'Content-Type': 'application/json'})} )
            this.http.get('mock-data/login-token.json')
            .subscribe(
                data => {
                    const value = data.json();
                    console.log('fuck!');
                    if (value.sysinfo.auth) {
                        this.isLoggedIn = true;
                        if (currentUser.isAdmin) {
                            this.isAdmin = true;
                        }
                    }
                },
                error => console.log(error)
            );

        }
    } */

}
