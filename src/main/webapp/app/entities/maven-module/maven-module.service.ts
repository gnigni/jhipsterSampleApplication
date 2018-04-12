import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MavenModule } from './maven-module.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MavenModule>;

@Injectable()
export class MavenModuleService {

    private resourceUrl =  SERVER_API_URL + 'api/maven-modules';

    constructor(private http: HttpClient) { }

    create(mavenModule: MavenModule): Observable<EntityResponseType> {
        const copy = this.convert(mavenModule);
        return this.http.post<MavenModule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mavenModule: MavenModule): Observable<EntityResponseType> {
        const copy = this.convert(mavenModule);
        return this.http.put<MavenModule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MavenModule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MavenModule[]>> {
        const options = createRequestOption(req);
        return this.http.get<MavenModule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MavenModule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MavenModule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MavenModule[]>): HttpResponse<MavenModule[]> {
        const jsonResponse: MavenModule[] = res.body;
        const body: MavenModule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MavenModule.
     */
    private convertItemFromServer(mavenModule: MavenModule): MavenModule {
        const copy: MavenModule = Object.assign({}, mavenModule);
        return copy;
    }

    /**
     * Convert a MavenModule to a JSON which can be sent to the server.
     */
    private convert(mavenModule: MavenModule): MavenModule {
        const copy: MavenModule = Object.assign({}, mavenModule);
        return copy;
    }
}
