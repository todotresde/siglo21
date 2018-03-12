import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MOProduct } from './mo-product.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MOProduct>;

@Injectable()
export class MOProductService {

    private resourceUrl =  SERVER_API_URL + 'api/mo-products';

    constructor(private http: HttpClient) { }

    create(mOProduct: MOProduct): Observable<EntityResponseType> {
        const copy = this.convert(mOProduct);
        return this.http.post<MOProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mOProduct: MOProduct): Observable<EntityResponseType> {
        const copy = this.convert(mOProduct);
        return this.http.put<MOProduct>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MOProduct>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MOProduct[]>> {
        const options = createRequestOption(req);
        return this.http.get<MOProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MOProduct[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MOProduct = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MOProduct[]>): HttpResponse<MOProduct[]> {
        const jsonResponse: MOProduct[] = res.body;
        const body: MOProduct[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MOProduct.
     */
    private convertItemFromServer(mOProduct: MOProduct): MOProduct {
        const copy: MOProduct = Object.assign({}, mOProduct);
        return copy;
    }

    /**
     * Convert a MOProduct to a JSON which can be sent to the server.
     */
    private convert(mOProduct: MOProduct): MOProduct {
        const copy: MOProduct = Object.assign({}, mOProduct);
        return copy;
    }
}
