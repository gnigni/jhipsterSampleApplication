import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GitRepo } from './git-repo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GitRepo>;

@Injectable()
export class GitRepoService {

    private resourceUrl =  SERVER_API_URL + 'api/git-repos';

    constructor(private http: HttpClient) { }

    create(gitRepo: GitRepo): Observable<EntityResponseType> {
        const copy = this.convert(gitRepo);
        return this.http.post<GitRepo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(gitRepo: GitRepo): Observable<EntityResponseType> {
        const copy = this.convert(gitRepo);
        return this.http.put<GitRepo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GitRepo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GitRepo[]>> {
        const options = createRequestOption(req);
        return this.http.get<GitRepo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GitRepo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GitRepo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GitRepo[]>): HttpResponse<GitRepo[]> {
        const jsonResponse: GitRepo[] = res.body;
        const body: GitRepo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GitRepo.
     */
    private convertItemFromServer(gitRepo: GitRepo): GitRepo {
        const copy: GitRepo = Object.assign({}, gitRepo);
        return copy;
    }

    /**
     * Convert a GitRepo to a JSON which can be sent to the server.
     */
    private convert(gitRepo: GitRepo): GitRepo {
        const copy: GitRepo = Object.assign({}, gitRepo);
        return copy;
    }
}
