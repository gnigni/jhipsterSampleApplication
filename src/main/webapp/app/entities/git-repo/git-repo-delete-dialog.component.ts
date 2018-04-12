import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GitRepo } from './git-repo.model';
import { GitRepoPopupService } from './git-repo-popup.service';
import { GitRepoService } from './git-repo.service';

@Component({
    selector: 'jhi-git-repo-delete-dialog',
    templateUrl: './git-repo-delete-dialog.component.html'
})
export class GitRepoDeleteDialogComponent {

    gitRepo: GitRepo;

    constructor(
        private gitRepoService: GitRepoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gitRepoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gitRepoListModification',
                content: 'Deleted an gitRepo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-git-repo-delete-popup',
    template: ''
})
export class GitRepoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gitRepoPopupService: GitRepoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gitRepoPopupService
                .open(GitRepoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
