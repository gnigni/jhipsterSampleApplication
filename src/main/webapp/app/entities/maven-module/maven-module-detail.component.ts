import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MavenModule } from './maven-module.model';
import { MavenModuleService } from './maven-module.service';

@Component({
    selector: 'jhi-maven-module-detail',
    templateUrl: './maven-module-detail.component.html'
})
export class MavenModuleDetailComponent implements OnInit, OnDestroy {

    mavenModule: MavenModule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mavenModuleService: MavenModuleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMavenModules();
    }

    load(id) {
        this.mavenModuleService.find(id)
            .subscribe((mavenModuleResponse: HttpResponse<MavenModule>) => {
                this.mavenModule = mavenModuleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMavenModules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mavenModuleListModification',
            (response) => this.load(this.mavenModule.id)
        );
    }
}
