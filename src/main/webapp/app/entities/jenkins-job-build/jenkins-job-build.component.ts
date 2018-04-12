import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JenkinsJobBuild } from './jenkins-job-build.model';
import { JenkinsJobBuildService } from './jenkins-job-build.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jenkins-job-build',
    templateUrl: './jenkins-job-build.component.html'
})
export class JenkinsJobBuildComponent implements OnInit, OnDestroy {
jenkinsJobBuilds: JenkinsJobBuild[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jenkinsJobBuildService: JenkinsJobBuildService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jenkinsJobBuildService.query().subscribe(
            (res: HttpResponse<JenkinsJobBuild[]>) => {
                this.jenkinsJobBuilds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJenkinsJobBuilds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JenkinsJobBuild) {
        return item.id;
    }
    registerChangeInJenkinsJobBuilds() {
        this.eventSubscriber = this.eventManager.subscribe('jenkinsJobBuildListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
