import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GitRepo } from './git-repo.model';
import { GitRepoPopupService } from './git-repo-popup.service';
import { GitRepoService } from './git-repo.service';
import { MavenModule, MavenModuleService } from '../maven-module';

@Component({
    selector: 'jhi-git-repo-dialog',
    templateUrl: './git-repo-dialog.component.html'
})
export class GitRepoDialogComponent implements OnInit {

    gitRepo: GitRepo;
    isSaving: boolean;

    mavenmodules: MavenModule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private gitRepoService: GitRepoService,
        private mavenModuleService: MavenModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mavenModuleService
            .query({filter: 'gitrepo-is-null'})
            .subscribe((res: HttpResponse<MavenModule[]>) => {
                if (!this.gitRepo.mavenModule || !this.gitRepo.mavenModule.id) {
                    this.mavenmodules = res.body;
                } else {
                    this.mavenModuleService
                        .find(this.gitRepo.mavenModule.id)
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
        if (this.gitRepo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gitRepoService.update(this.gitRepo));
        } else {
            this.subscribeToSaveResponse(
                this.gitRepoService.create(this.gitRepo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GitRepo>>) {
        result.subscribe((res: HttpResponse<GitRepo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GitRepo) {
        this.eventManager.broadcast({ name: 'gitRepoListModification', content: 'OK'});
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
    selector: 'jhi-git-repo-popup',
    template: ''
})
export class GitRepoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gitRepoPopupService: GitRepoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gitRepoPopupService
                    .open(GitRepoDialogComponent as Component, params['id']);
            } else {
                this.gitRepoPopupService
                    .open(GitRepoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
