import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SonarComponent } from './sonar-component.model';
import { SonarComponentService } from './sonar-component.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sonar-component',
    templateUrl: './sonar-component.component.html'
})
export class SonarComponentComponent implements OnInit, OnDestroy {
sonarComponents: SonarComponent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sonarComponentService: SonarComponentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sonarComponentService.query().subscribe(
            (res: HttpResponse<SonarComponent[]>) => {
                this.sonarComponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSonarComponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SonarComponent) {
        return item.id;
    }
    registerChangeInSonarComponents() {
        this.eventSubscriber = this.eventManager.subscribe('sonarComponentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
