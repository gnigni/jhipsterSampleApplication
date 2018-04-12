import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JenkinsJobBuild } from './jenkins-job-build.model';
import { JenkinsJobBuildPopupService } from './jenkins-job-build-popup.service';
import { JenkinsJobBuildService } from './jenkins-job-build.service';

@Component({
    selector: 'jhi-jenkins-job-build-delete-dialog',
    templateUrl: './jenkins-job-build-delete-dialog.component.html'
})
export class JenkinsJobBuildDeleteDialogComponent {

    jenkinsJobBuild: JenkinsJobBuild;

    constructor(
        private jenkinsJobBuildService: JenkinsJobBuildService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jenkinsJobBuildService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jenkinsJobBuildListModification',
                content: 'Deleted an jenkinsJobBuild'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jenkins-job-build-delete-popup',
    template: ''
})
export class JenkinsJobBuildDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jenkinsJobBuildPopupService: JenkinsJobBuildPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jenkinsJobBuildPopupService
                .open(JenkinsJobBuildDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
