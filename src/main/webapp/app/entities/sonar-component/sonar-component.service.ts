import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SonarComponent } from './sonar-component.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SonarComponent>;

@Injectable()
export class SonarComponentService {

    private resourceUrl =  SERVER_API_URL + 'api/sonar-components';

    constructor(private http: HttpClient) { }

    create(sonarComponent: SonarComponent): Observable<EntityResponseType> {
        const copy = this.convert(sonarComponent);
        return this.http.post<SonarComponent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sonarComponent: SonarComponent): Observable<EntityResponseType> {
        const copy = this.convert(sonarComponent);
        return this.http.put<SonarComponent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SonarComponent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SonarComponent[]>> {
        const options = createRequestOption(req);
        return this.http.get<SonarComponent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SonarComponent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SonarComponent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SonarComponent[]>): HttpResponse<SonarComponent[]> {
        const jsonResponse: SonarComponent[] = res.body;
        const body: SonarComponent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SonarComponent.
     */
    private convertItemFromServer(sonarComponent: SonarComponent): SonarComponent {
        const copy: SonarComponent = Object.assign({}, sonarComponent);
        return copy;
    }

    /**
     * Convert a SonarComponent to a JSON which can be sent to the server.
     */
    private convert(sonarComponent: SonarComponent): SonarComponent {
        const copy: SonarComponent = Object.assign({}, sonarComponent);
        return copy;
    }
}
