import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JenkinsJobBuild } from './jenkins-job-build.model';
import { JenkinsJobBuildPopupService } from './jenkins-job-build-popup.service';
import { JenkinsJobBuildService } from './jenkins-job-build.service';
import { JenkinsJob, JenkinsJobService } from '../jenkins-job';

@Component({
    selector: 'jhi-jenkins-job-build-dialog',
    templateUrl: './jenkins-job-build-dialog.component.html'
})
export class JenkinsJobBuildDialogComponent implements OnInit {

    jenkinsJobBuild: JenkinsJobBuild;
    isSaving: boolean;

    jenkinsjobs: JenkinsJob[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jenkinsJobBuildService: JenkinsJobBuildService,
        private jenkinsJobService: JenkinsJobService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jenkinsJobService.query()
            .subscribe((res: HttpResponse<JenkinsJob[]>) => { this.jenkinsjobs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jenkinsJobBuild.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jenkinsJobBuildService.update(this.jenkinsJobBuild));
        } else {
            this.subscribeToSaveResponse(
                this.jenkinsJobBuildService.create(this.jenkinsJobBuild));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JenkinsJobBuild>>) {
        result.subscribe((res: HttpResponse<JenkinsJobBuild>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JenkinsJobBuild) {
        this.eventManager.broadcast({ name: 'jenkinsJobBuildListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJenkinsJobById(index: number, item: JenkinsJob) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jenkins-job-build-popup',
    template: ''
})
export class JenkinsJobBuildPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jenkinsJobBuildPopupService: JenkinsJobBuildPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jenkinsJobBuildPopupService
                    .open(JenkinsJobBuildDialogComponent as Component, params['id']);
            } else {
                this.jenkinsJobBuildPopupService
                    .open(JenkinsJobBuildDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
