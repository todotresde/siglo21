import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PTAttribute } from './pt-attribute.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PTAttribute>;

@Injectable()
export class PTAttributeService {

    private resourceUrl =  SERVER_API_URL + 'api/pt-attributes';

    constructor(private http: HttpClient) { }

    create(pTAttribute: PTAttribute): Observable<EntityResponseType> {
        const copy = this.convert(pTAttribute);
        return this.http.post<PTAttribute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pTAttribute: PTAttribute): Observable<EntityResponseType> {
        const copy = this.convert(pTAttribute);
        return this.http.put<PTAttribute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PTAttribute>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PTAttribute[]>> {
        const options = createRequestOption(req);
        return this.http.get<PTAttribute[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PTAttribute[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PTAttribute = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PTAttribute[]>): HttpResponse<PTAttribute[]> {
        const jsonResponse: PTAttribute[] = res.body;
        const body: PTAttribute[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PTAttribute.
     */
    private convertItemFromServer(pTAttribute: PTAttribute): PTAttribute {
        const copy: PTAttribute = Object.assign({}, pTAttribute);
        return copy;
    }

    /**
     * Convert a PTAttribute to a JSON which can be sent to the server.
     */
    private convert(pTAttribute: PTAttribute): PTAttribute {
        const copy: PTAttribute = Object.assign({}, pTAttribute);
        return copy;
    }
}
