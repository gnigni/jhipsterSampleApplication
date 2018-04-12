import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JenkinsJob } from './jenkins-job.model';
import { JenkinsJobPopupService } from './jenkins-job-popup.service';
import { JenkinsJobService } from './jenkins-job.service';
import { JenkinsFolder, JenkinsFolderService } from '../jenkins-folder';

@Component({
    selector: 'jhi-jenkins-job-dialog',
    templateUrl: './jenkins-job-dialog.component.html'
})
export class JenkinsJobDialogComponent implements OnInit {

    jenkinsJob: JenkinsJob;
    isSaving: boolean;

    jenkinsfolders: JenkinsFolder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jenkinsJobService: JenkinsJobService,
        private jenkinsFolderService: JenkinsFolderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jenkinsFolderService
            .query({filter: 'jenkinsjob-is-null'})
            .subscribe((res: HttpResponse<JenkinsFolder[]>) => {
                if (!this.jenkinsJob.jenkinsFolder || !this.jenkinsJob.jenkinsFolder.id) {
                    this.jenkinsfolders = res.body;
                } else {
                    this.jenkinsFolderService
                        .find(this.jenkinsJob.jenkinsFolder.id)
                        .subscribe((subRes: HttpResponse<JenkinsFolder>) => {
                            this.jenkinsfolders = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jenkinsJob.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jenkinsJobService.update(this.jenkinsJob));
        } else {
            this.subscribeToSaveResponse(
                this.jenkinsJobService.create(this.jenkinsJob));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JenkinsJob>>) {
        result.subscribe((res: HttpResponse<JenkinsJob>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JenkinsJob) {
        this.eventManager.broadcast({ name: 'jenkinsJobListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJenkinsFolderById(index: number, item: JenkinsFolder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jenkins-job-popup',
    template: ''
})
export class JenkinsJobPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jenkinsJobPopupService: JenkinsJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jenkinsJobPopupService
                    .open(JenkinsJobDialogComponent as Component, params['id']);
            } else {
                this.jenkinsJobPopupService
                    .open(JenkinsJobDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
