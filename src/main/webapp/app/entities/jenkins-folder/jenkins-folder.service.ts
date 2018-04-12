import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JenkinsFolder } from './jenkins-folder.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JenkinsFolder>;

@Injectable()
export class JenkinsFolderService {

    private resourceUrl =  SERVER_API_URL + 'api/jenkins-folders';

    constructor(private http: HttpClient) { }

    create(jenkinsFolder: JenkinsFolder): Observable<EntityResponseType> {
        const copy = this.convert(jenkinsFolder);
        return this.http.post<JenkinsFolder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jenkinsFolder: JenkinsFolder): Observable<EntityResponseType> {
        const copy = this.convert(jenkinsFolder);
        return this.http.put<JenkinsFolder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JenkinsFolder>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JenkinsFolder[]>> {
        const options = createRequestOption(req);
        return this.http.get<JenkinsFolder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JenkinsFolder[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JenkinsFolder = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JenkinsFolder[]>): HttpResponse<JenkinsFolder[]> {
        const jsonResponse: JenkinsFolder[] = res.body;
        const body: JenkinsFolder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JenkinsFolder.
     */
    private convertItemFromServer(jenkinsFolder: JenkinsFolder): JenkinsFolder {
        const copy: JenkinsFolder = Object.assign({}, jenkinsFolder);
        return copy;
    }

    /**
     * Convert a JenkinsFolder to a JSON which can be sent to the server.
     */
    private convert(jenkinsFolder: JenkinsFolder): JenkinsFolder {
        const copy: JenkinsFolder = Object.assign({}, jenkinsFolder);
        return copy;
    }
}
