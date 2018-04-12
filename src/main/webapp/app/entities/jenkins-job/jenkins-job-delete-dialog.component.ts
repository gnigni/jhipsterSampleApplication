import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JenkinsJob } from './jenkins-job.model';
import { JenkinsJobPopupService } from './jenkins-job-popup.service';
import { JenkinsJobService } from './jenkins-job.service';

@Component({
    selector: 'jhi-jenkins-job-delete-dialog',
    templateUrl: './jenkins-job-delete-dialog.component.html'
})
export class JenkinsJobDeleteDialogComponent {

    jenkinsJob: JenkinsJob;

    constructor(
        private jenkinsJobService: JenkinsJobService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jenkinsJobService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jenkinsJobListModification',
                content: 'Deleted an jenkinsJob'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jenkins-job-delete-popup',
    template: ''
})
export class JenkinsJobDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jenkinsJobPopupService: JenkinsJobPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jenkinsJobPopupService
                .open(JenkinsJobDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
