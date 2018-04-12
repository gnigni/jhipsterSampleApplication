import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JenkinsJob } from './jenkins-job.model';
import { JenkinsJobService } from './jenkins-job.service';

@Component({
    selector: 'jhi-jenkins-job-detail',
    templateUrl: './jenkins-job-detail.component.html'
})
export class JenkinsJobDetailComponent implements OnInit, OnDestroy {

    jenkinsJob: JenkinsJob;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jenkinsJobService: JenkinsJobService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJenkinsJobs();
    }

    load(id) {
        this.jenkinsJobService.find(id)
            .subscribe((jenkinsJobResponse: HttpResponse<JenkinsJob>) => {
                this.jenkinsJob = jenkinsJobResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJenkinsJobs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jenkinsJobListModification',
            (response) => this.load(this.jenkinsJob.id)
        );
    }
}
