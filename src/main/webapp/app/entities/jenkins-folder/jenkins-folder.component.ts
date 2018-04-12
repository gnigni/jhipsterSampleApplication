import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JenkinsFolder } from './jenkins-folder.model';
import { JenkinsFolderService } from './jenkins-folder.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-jenkins-folder',
    templateUrl: './jenkins-folder.component.html'
})
export class JenkinsFolderComponent implements OnInit, OnDestroy {
jenkinsFolders: JenkinsFolder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jenkinsFolderService: JenkinsFolderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jenkinsFolderService.query().subscribe(
            (res: HttpResponse<JenkinsFolder[]>) => {
                this.jenkinsFolders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJenkinsFolders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JenkinsFolder) {
        return item.id;
    }
    registerChangeInJenkinsFolders() {
        this.eventSubscriber = this.eventManager.subscribe('jenkinsFolderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
