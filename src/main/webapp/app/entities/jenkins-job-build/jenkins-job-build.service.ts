import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JenkinsJobBuild } from './jenkins-job-build.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JenkinsJobBuild>;

@Injectable()
export class JenkinsJobBuildService {

    private resourceUrl =  SERVER_API_URL + 'api/jenkins-job-builds';

    constructor(private http: HttpClient) { }

    create(jenkinsJobBuild: JenkinsJobBuild): Observable<EntityResponseType> {
        const copy = this.convert(jenkinsJobBuild);
        return this.http.post<JenkinsJobBuild>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jenkinsJobBuild: JenkinsJobBuild): Observable<EntityResponseType> {
        const copy = this.convert(jenkinsJobBuild);
        return this.http.put<JenkinsJobBuild>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JenkinsJobBuild>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JenkinsJobBuild[]>> {
        const options = createRequestOption(req);
        return this.http.get<JenkinsJobBuild[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JenkinsJobBuild[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JenkinsJobBuild = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JenkinsJobBuild[]>): HttpResponse<JenkinsJobBuild[]> {
        const jsonResponse: JenkinsJobBuild[] = res.body;
        const body: JenkinsJobBuild[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JenkinsJobBuild.
     */
    private convertItemFromServer(jenkinsJobBuild: JenkinsJobBuild): JenkinsJobBuild {
        const copy: JenkinsJobBuild = Object.assign({}, jenkinsJobBuild);
        return copy;
    }

    /**
     * Convert a JenkinsJobBuild to a JSON which can be sent to the server.
     */
    private convert(jenkinsJobBuild: JenkinsJobBuild): JenkinsJobBuild {
        const copy: JenkinsJobBuild = Object.assign({}, jenkinsJobBuild);
        return copy;
    }
}
