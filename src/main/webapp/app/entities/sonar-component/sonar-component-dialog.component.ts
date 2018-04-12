import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SonarComponent } from './sonar-component.model';
import { SonarComponentPopupService } from './sonar-component-popup.service';
import { SonarComponentService } from './sonar-component.service';
import { MavenModule, MavenModuleService } from '../maven-module';

@Component({
    selector: 'jhi-sonar-component-dialog',
    templateUrl: './sonar-component-dialog.component.html'
})
export class SonarComponentDialogComponent implements OnInit {

    sonarComponent: SonarComponent;
    isSaving: boolean;

    mavenmodules: MavenModule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sonarComponentService: SonarComponentService,
        private mavenModuleService: MavenModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mavenModuleService
            .query({filter: 'sonarcomponent-is-null'})
            .subscribe((res: HttpResponse<MavenModule[]>) => {
                if (!this.sonarComponent.mavenModule || !this.sonarComponent.mavenModule.id) {
                    this.mavenmodules = res.body;
                } else {
                    this.mavenModuleService
                        .find(this.sonarComponent.mavenModule.id)
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
        if (this.sonarComponent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sonarComponentService.update(this.sonarComponent));
        } else {
            this.subscribeToSaveResponse(
                this.sonarComponentService.create(this.sonarComponent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SonarComponent>>) {
        result.subscribe((res: HttpResponse<SonarComponent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SonarComponent) {
        this.eventManager.broadcast({ name: 'sonarComponentListModification', content: 'OK'});
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
    selector: 'jhi-sonar-component-popup',
    template: ''
})
export class SonarComponentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sonarComponentPopupService: SonarComponentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sonarComponentPopupService
                    .open(SonarComponentDialogComponent as Component, params['id']);
            } else {
                this.sonarComponentPopupService
                    .open(SonarComponentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
