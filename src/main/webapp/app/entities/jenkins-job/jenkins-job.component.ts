import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JenkinsJob } from './jenkins-job.model';
import { JenkinsJobService } from './jenkins-job.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jenkins-job',
    templateUrl: './jenkins-job.component.html'
})
export class JenkinsJobComponent implements OnInit, OnDestroy {
jenkinsJobs: JenkinsJob[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jenkinsJobService: JenkinsJobService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jenkinsJobService.query().subscribe(
            (res: HttpResponse<JenkinsJob[]>) => {
                this.jenkinsJobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJenkinsJobs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JenkinsJob) {
        return item.id;
    }
    registerChangeInJenkinsJobs() {
        this.eventSubscriber = this.eventManager.subscribe('jenkinsJobListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
