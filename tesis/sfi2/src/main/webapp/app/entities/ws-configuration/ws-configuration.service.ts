import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { WSConfiguration } from './ws-configuration.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WSConfiguration>;

@Injectable()
export class WSConfigurationService {

    private resourceUrl =  SERVER_API_URL + 'api/ws-configurations';

    constructor(private http: HttpClient) { }

    create(wSConfiguration: WSConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(wSConfiguration);
        return this.http.post<WSConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(wSConfiguration: WSConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(wSConfiguration);
        return this.http.put<WSConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WSConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WSConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http.get<WSConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WSConfiguration[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WSConfiguration = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WSConfiguration[]>): HttpResponse<WSConfiguration[]> {
        const jsonResponse: WSConfiguration[] = res.body;
        const body: WSConfiguration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WSConfiguration.
     */
    private convertItemFromServer(wSConfiguration: WSConfiguration): WSConfiguration {
        const copy: WSConfiguration = Object.assign({}, wSConfiguration);
        return copy;
    }

    /**
     * Convert a WSConfiguration to a JSON which can be sent to the server.
     */
    private convert(wSConfiguration: WSConfiguration): WSConfiguration {
        const copy: WSConfiguration = Object.assign({}, wSConfiguration);
        return copy;
    }
}
