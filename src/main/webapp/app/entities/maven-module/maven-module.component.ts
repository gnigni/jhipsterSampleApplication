import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MavenModule } from './maven-module.model';
import { MavenModuleService } from './maven-module.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-maven-module',
    templateUrl: './maven-module.component.html'
})
export class MavenModuleComponent implements OnInit, OnDestroy {
mavenModules: MavenModule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mavenModuleService: MavenModuleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mavenModuleService.query().subscribe(
            (res: HttpResponse<MavenModule[]>) => {
                this.mavenModules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMavenModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MavenModule) {
        return item.id;
    }
    registerChangeInMavenModules() {
        this.eventSubscriber = this.eventManager.subscribe('mavenModuleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
