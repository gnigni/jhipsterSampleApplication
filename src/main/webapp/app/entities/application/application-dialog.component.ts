import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Application } from './application.model';
import { ApplicationPopupService } from './application-popup.service';
import { ApplicationService } from './application.service';

@Component({
    selector: 'jhi-application-dialog',
    templateUrl: './application-dialog.component.html'
})
export class ApplicationDialogComponent implements OnInit {

    application: Application;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private applicationService: ApplicationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.application.id !== undefined) {
            this.subscribeToSaveResponse(
                this.applicationService.update(this.application));
        } else {
            this.subscribeToSaveResponse(
                this.applicationService.create(this.application));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Application>>) {
        result.subscribe((res: HttpResponse<Application>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Application) {
        this.eventManager.broadcast({ name: 'applicationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-application-popup',
    template: ''
})
export class ApplicationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicationPopupService: ApplicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.applicationPopupService
                    .open(ApplicationDialogComponent as Component, params['id']);
            } else {
                this.applicationPopupService
                    .open(ApplicationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
