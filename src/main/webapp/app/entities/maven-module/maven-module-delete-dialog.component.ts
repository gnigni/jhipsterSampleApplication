import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MavenModule } from './maven-module.model';
import { MavenModulePopupService } from './maven-module-popup.service';
import { MavenModuleService } from './maven-module.service';

@Component({
    selector: 'jhi-maven-module-delete-dialog',
    templateUrl: './maven-module-delete-dialog.component.html'
})
export class MavenModuleDeleteDialogComponent {

    mavenModule: MavenModule;

    constructor(
        private mavenModuleService: MavenModuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mavenModuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mavenModuleListModification',
                content: 'Deleted an mavenModule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-maven-module-delete-popup',
    template: ''
})
export class MavenModuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mavenModulePopupService: MavenModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mavenModulePopupService
                .open(MavenModuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
