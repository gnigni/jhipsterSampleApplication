import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GitRepo } from './git-repo.model';
import { GitRepoService } from './git-repo.service';

@Component({
    selector: 'jhi-git-repo-detail',
    templateUrl: './git-repo-detail.component.html'
})
export class GitRepoDetailComponent implements OnInit, OnDestroy {

    gitRepo: GitRepo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gitRepoService: GitRepoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGitRepos();
    }

    load(id) {
        this.gitRepoService.find(id)
            .subscribe((gitRepoResponse: HttpResponse<GitRepo>) => {
                this.gitRepo = gitRepoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGitRepos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gitRepoListModification',
            (response) => this.load(this.gitRepo.id)
        );
    }
}
