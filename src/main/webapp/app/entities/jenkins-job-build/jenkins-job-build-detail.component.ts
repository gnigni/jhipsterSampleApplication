import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JenkinsJobBuild } from './jenkins-job-build.model';
import { JenkinsJobBuildService } from './jenkins-job-build.service';

@Component({
    selector: 'jhi-jenkins-job-build-detail',
    templateUrl: './jenkins-job-build-detail.component.html'
})
export class JenkinsJobBuildDetailComponent implements OnInit, OnDestroy {

    jenkinsJobBuild: JenkinsJobBuild;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jenkinsJobBuildService: JenkinsJobBuildService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJenkinsJobBuilds();
    }

    load(id) {
        this.jenkinsJobBuildService.find(id)
            .subscribe((jenkinsJobBuildResponse: HttpResponse<JenkinsJobBuild>) => {
                this.jenkinsJobBuild = jenkinsJobBuildResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJenkinsJobBuilds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jenkinsJobBuildListModification',
            (response) => this.load(this.jenkinsJobBuild.id)
        );
    }
}
