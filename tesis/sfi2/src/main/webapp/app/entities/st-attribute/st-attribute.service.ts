import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { STAttribute } from './st-attribute.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<STAttribute>;

@Injectable()
export class STAttributeService {

    private resourceUrl =  SERVER_API_URL + 'api/st-attributes';

    constructor(private http: HttpClient) { }

    create(sTAttribute: STAttribute): Observable<EntityResponseType> {
        const copy = this.convert(sTAttribute);
        return this.http.post<STAttribute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sTAttribute: STAttribute): Observable<EntityResponseType> {
        const copy = this.convert(sTAttribute);
        return this.http.put<STAttribute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<STAttribute>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<STAttribute[]>> {
        const options = createRequestOption(req);
        return this.http.get<STAttribute[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<STAttribute[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: STAttribute = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<STAttribute[]>): HttpResponse<STAttribute[]> {
        const jsonResponse: STAttribute[] = res.body;
        const body: STAttribute[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to STAttribute.
     */
    private convertItemFromServer(sTAttribute: STAttribute): STAttribute {
        const copy: STAttribute = Object.assign({}, sTAttribute);
        return copy;
    }

    /**
     * Convert a STAttribute to a JSON which can be sent to the server.
     */
    private convert(sTAttribute: STAttribute): STAttribute {
        const copy: STAttribute = Object.assign({}, sTAttribute);
        return copy;
    }
}
