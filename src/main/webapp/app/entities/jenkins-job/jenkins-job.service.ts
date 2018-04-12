import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JenkinsJob } from './jenkins-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JenkinsJob>;

@Injectable()
export class JenkinsJobService {

    private resourceUrl =  SERVER_API_URL + 'api/jenkins-jobs';

    constructor(private http: HttpClient) { }

    create(jenkinsJob: JenkinsJob): Observable<EntityResponseType> {
        const copy = this.convert(jenkinsJob);
        return this.http.post<JenkinsJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jenkinsJob: JenkinsJob): Observable<EntityResponseType> {
        const copy = this.convert(jenkinsJob);
        return this.http.put<JenkinsJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JenkinsJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JenkinsJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<JenkinsJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JenkinsJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JenkinsJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JenkinsJob[]>): HttpResponse<JenkinsJob[]> {
        const jsonResponse: JenkinsJob[] = res.body;
        const body: JenkinsJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JenkinsJob.
     */
    private convertItemFromServer(jenkinsJob: JenkinsJob): JenkinsJob {
        const copy: JenkinsJob = Object.assign({}, jenkinsJob);
        return copy;
    }

    /**
     * Convert a JenkinsJob to a JSON which can be sent to the server.
     */
    private convert(jenkinsJob: JenkinsJob): JenkinsJob {
        const copy: JenkinsJob = Object.assign({}, jenkinsJob);
        return copy;
    }
}
