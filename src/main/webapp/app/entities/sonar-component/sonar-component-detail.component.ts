import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SonarComponent } from './sonar-component.model';
import { SonarComponentService } from './sonar-component.service';

@Component({
    selector: 'jhi-sonar-component-detail',
    templateUrl: './sonar-component-detail.component.html'
})
export class SonarComponentDetailComponent implements OnInit, OnDestroy {

    sonarComponent: SonarComponent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sonarComponentService: SonarComponentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSonarComponents();
    }

    load(id) {
        this.sonarComponentService.find(id)
            .subscribe((sonarComponentResponse: HttpResponse<SonarComponent>) => {
                this.sonarComponent = sonarComponentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSonarComponents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sonarComponentListModification',
            (response) => this.load(this.sonarComponent.id)
        );
    }
}
