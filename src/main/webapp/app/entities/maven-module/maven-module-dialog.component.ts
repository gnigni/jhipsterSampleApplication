import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MavenModule } from './maven-module.model';
import { MavenModulePopupService } from './maven-module-popup.service';
import { MavenModuleService } from './maven-module.service';
import { Application, ApplicationService } from '../application';

@Component({
    selector: 'jhi-maven-module-dialog',
    templateUrl: './maven-module-dialog.component.html'
})
export class MavenModuleDialogComponent implements OnInit {

    mavenModule: MavenModule;
    isSaving: boolean;

    applications: Application[];

    mavenmodules: MavenModule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mavenModuleService: MavenModuleService,
        private applicationService: ApplicationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.applicationService.query()
            .subscribe((res: HttpResponse<Application[]>) => { this.applications = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.mavenModuleService.query()
            .subscribe((res: HttpResponse<MavenModule[]>) => { this.mavenmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mavenModule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mavenModuleService.update(this.mavenModule));
        } else {
            this.subscribeToSaveResponse(
                this.mavenModuleService.create(this.mavenModule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MavenModule>>) {
        result.subscribe((res: HttpResponse<MavenModule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MavenModule) {
        this.eventManager.broadcast({ name: 'mavenModuleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackApplicationById(index: number, item: Application) {
        return item.id;
    }

    trackMavenModuleById(index: number, item: MavenModule) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-maven-module-popup',
    template: ''
})
export class MavenModulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mavenModulePopupService: MavenModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mavenModulePopupService
                    .open(MavenModuleDialogComponent as Component, params['id']);
            } else {
                this.mavenModulePopupService
                    .open(MavenModuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
