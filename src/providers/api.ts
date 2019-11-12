/* tslint:disable:forin */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from './util';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

    private timeOut = 15000;
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

    get(endpoint: string, params?: any): any {
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
        //
        // // Support easy query params for GET requests
        // if (params) {
        //     const p = new URLSearchParams();
        //     for (const k in params) {
        //         p.set(k, params[k]);
        //     }
        //     options.search = !options.search && p || options.search;
        // }
        return this.http.get(this.util.url + endpoint, httpOptions);
    }

}
