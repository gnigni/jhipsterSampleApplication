import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JenkinsFolder } from './jenkins-folder.model';
import { JenkinsFolderService } from './jenkins-folder.service';

@Component({
    selector: 'jhi-jenkins-folder-detail',
    templateUrl: './jenkins-folder-detail.component.html'
})
export class JenkinsFolderDetailComponent implements OnInit, OnDestroy {

    jenkinsFolder: JenkinsFolder;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jenkinsFolderService: JenkinsFolderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJenkinsFolders();
    }

    load(id) {
        this.jenkinsFolderService.find(id)
            .subscribe((jenkinsFolderResponse: HttpResponse<JenkinsFolder>) => {
                this.jenkinsFolder = jenkinsFolderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJenkinsFolders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jenkinsFolderListModification',
            (response) => this.load(this.jenkinsFolder.id)
        );
    }
}
