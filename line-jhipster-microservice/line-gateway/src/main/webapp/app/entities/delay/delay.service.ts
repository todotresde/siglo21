import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Delay } from './delay.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class DelayService {

    private resourceUrl = 'linemanufacturing/api/delays';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(delay: Delay): Observable<Delay> {
        let copy: Delay = Object.assign({}, delay);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(delay.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(delay.endDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(delay: Delay): Observable<Delay> {
        let copy: Delay = Object.assign({}, delay);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(delay.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(delay.endDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Delay> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.startDate);
            jsonResponse.endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.endDate);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].startDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].startDate);
            jsonResponse[i].endDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].endDate);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
