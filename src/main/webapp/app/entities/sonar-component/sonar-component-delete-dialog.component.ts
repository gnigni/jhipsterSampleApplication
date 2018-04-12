import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SonarComponent } from './sonar-component.model';
import { SonarComponentPopupService } from './sonar-component-popup.service';
import { SonarComponentService } from './sonar-component.service';

@Component({
    selector: 'jhi-sonar-component-delete-dialog',
    templateUrl: './sonar-component-delete-dialog.component.html'
})
export class SonarComponentDeleteDialogComponent {

    sonarComponent: SonarComponent;

    constructor(
        private sonarComponentService: SonarComponentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sonarComponentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sonarComponentListModification',
                content: 'Deleted an sonarComponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sonar-component-delete-popup',
    template: ''
})
export class SonarComponentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sonarComponentPopupService: SonarComponentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sonarComponentPopupService
                .open(SonarComponentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
