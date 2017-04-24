import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Tracing } from './tracing.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class TracingService {

    private resourceUrl = 'linemanufacturing/api/tracings';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(tracing: Tracing): Observable<Tracing> {
        let copy: Tracing = Object.assign({}, tracing);
        copy.inTime = this.dateUtils
            .convertLocalDateToServer(tracing.inTime);
        copy.startTime = this.dateUtils
            .convertLocalDateToServer(tracing.startTime);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(tracing: Tracing): Observable<Tracing> {
        let copy: Tracing = Object.assign({}, tracing);
        copy.inTime = this.dateUtils
            .convertLocalDateToServer(tracing.inTime);
        copy.startTime = this.dateUtils
            .convertLocalDateToServer(tracing.startTime);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Tracing> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.inTime = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.inTime);
            jsonResponse.startTime = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.startTime);
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
            jsonResponse[i].inTime = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].inTime);
            jsonResponse[i].startTime = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].startTime);
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
