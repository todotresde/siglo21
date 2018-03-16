import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { STAttributeValue } from './st-attribute-value.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<STAttributeValue>;

@Injectable()
export class STAttributeValueService {

    private resourceUrl =  SERVER_API_URL + 'api/st-attribute-values';

    constructor(private http: HttpClient) { }

    create(sTAttributeValue: STAttributeValue): Observable<EntityResponseType> {
        const copy = this.convert(sTAttributeValue);
        return this.http.post<STAttributeValue>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sTAttributeValue: STAttributeValue): Observable<EntityResponseType> {
        const copy = this.convert(sTAttributeValue);
        return this.http.put<STAttributeValue>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<STAttributeValue>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<STAttributeValue[]>> {
        const options = createRequestOption(req);
        return this.http.get<STAttributeValue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<STAttributeValue[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: STAttributeValue = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<STAttributeValue[]>): HttpResponse<STAttributeValue[]> {
        const jsonResponse: STAttributeValue[] = res.body;
        const body: STAttributeValue[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to STAttributeValue.
     */
    private convertItemFromServer(sTAttributeValue: STAttributeValue): STAttributeValue {
        const copy: STAttributeValue = Object.assign({}, sTAttributeValue);
        return copy;
    }

    /**
     * Convert a STAttributeValue to a JSON which can be sent to the server.
     */
    private convert(sTAttributeValue: STAttributeValue): STAttributeValue {
        const copy: STAttributeValue = Object.assign({}, sTAttributeValue);
        return copy;
    }
}
