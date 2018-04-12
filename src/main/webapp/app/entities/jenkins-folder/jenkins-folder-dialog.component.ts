import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JenkinsFolder } from './jenkins-folder.model';
import { JenkinsFolderPopupService } from './jenkins-folder-popup.service';
import { JenkinsFolderService } from './jenkins-folder.service';
import { MavenModule, MavenModuleService } from '../maven-module';

@Component({
    selector: 'jhi-jenkins-folder-dialog',
    templateUrl: './jenkins-folder-dialog.component.html'
})
export class JenkinsFolderDialogComponent implements OnInit {

    jenkinsFolder: JenkinsFolder;
    isSaving: boolean;

    mavenmodules: MavenModule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jenkinsFolderService: JenkinsFolderService,
        private mavenModuleService: MavenModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mavenModuleService
            .query({filter: 'jenkinsfolder-is-null'})
            .subscribe((res: HttpResponse<MavenModule[]>) => {
                if (!this.jenkinsFolder.mavenModule || !this.jenkinsFolder.mavenModule.id) {
                    this.mavenmodules = res.body;
                } else {
                    this.mavenModuleService
                        .find(this.jenkinsFolder.mavenModule.id)
                        .subscribe((subRes: HttpResponse<MavenModule>) => {
                            this.mavenmodules = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jenkinsFolder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jenkinsFolderService.update(this.jenkinsFolder));
        } else {
            this.subscribeToSaveResponse(
                this.jenkinsFolderService.create(this.jenkinsFolder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JenkinsFolder>>) {
        result.subscribe((res: HttpResponse<JenkinsFolder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JenkinsFolder) {
        this.eventManager.broadcast({ name: 'jenkinsFolderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMavenModuleById(index: number, item: MavenModule) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jenkins-folder-popup',
    template: ''
})
export class JenkinsFolderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jenkinsFolderPopupService: JenkinsFolderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jenkinsFolderPopupService
                    .open(JenkinsFolderDialogComponent as Component, params['id']);
            } else {
                this.jenkinsFolderPopupService
                    .open(JenkinsFolderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
