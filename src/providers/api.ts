/* tslint:disable:forin */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from './util';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

    constructor(
        private http: HttpClient,
        public util: Util,

    ) {


    }

    post( endpoint: string, body: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        const token = this.util.getPreference('token');
        if (token) {
            httpOptions.headers =
                httpOptions.headers.set('Authorization', 'Bearer ' + token);
        }
        return this.http.post(this.util.url + endpoint, body, httpOptions);
    }
    postWithFiles( endpoint: string, body: FormData) {

        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type':  'multipart/form-data'
            })
        };
        const token = this.util.getPreference('token');
        if (token) {
            httpOptions.headers =
                httpOptions.headers.set('Authorization', 'Bearer ' + token);
        }
        return this.http.post(this.util.url + endpoint, body, httpOptions);
    }

    get(endpoint: string): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        const token = this.util.getPreference(this.util.constants.token);
        if (token) {
            httpOptions.headers =
                httpOptions.headers.set('Authorization', 'Bearer ' + token);
        }
        return this.http.get(this.util.url + endpoint, httpOptions);
    }

    patch(endpoint: string, body: any): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        const token = this.util.getPreference(this.util.constants.token);
        if (token) {
            httpOptions.headers =
                httpOptions.headers.set('Authorization', 'Bearer ' + token);
        }
        return this.http.patch(this.util.url + endpoint, body, httpOptions);
    }

}
