import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JenkinsFolder } from './jenkins-folder.model';
import { JenkinsFolderPopupService } from './jenkins-folder-popup.service';
import { JenkinsFolderService } from './jenkins-folder.service';

@Component({
    selector: 'jhi-jenkins-folder-delete-dialog',
    templateUrl: './jenkins-folder-delete-dialog.component.html'
})
export class JenkinsFolderDeleteDialogComponent {

    jenkinsFolder: JenkinsFolder;

    constructor(
        private jenkinsFolderService: JenkinsFolderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jenkinsFolderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jenkinsFolderListModification',
                content: 'Deleted an jenkinsFolder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jenkins-folder-delete-popup',
    template: ''
})
export class JenkinsFolderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jenkinsFolderPopupService: JenkinsFolderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jenkinsFolderPopupService
                .open(JenkinsFolderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
