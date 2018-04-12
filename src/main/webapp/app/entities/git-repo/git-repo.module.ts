import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    GitRepoService,
    GitRepoPopupService,
    GitRepoComponent,
    GitRepoDetailComponent,
    GitRepoDialogComponent,
    GitRepoPopupComponent,
    GitRepoDeletePopupComponent,
    GitRepoDeleteDialogComponent,
    gitRepoRoute,
    gitRepoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...gitRepoRoute,
    ...gitRepoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GitRepoComponent,
        GitRepoDetailComponent,
        GitRepoDialogComponent,
        GitRepoDeleteDialogComponent,
        GitRepoPopupComponent,
        GitRepoDeletePopupComponent,
    ],
    entryComponents: [
        GitRepoComponent,
        GitRepoDialogComponent,
        GitRepoPopupComponent,
        GitRepoDeleteDialogComponent,
        GitRepoDeletePopupComponent,
    ],
    providers: [
        GitRepoService,
        GitRepoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationGitRepoModule {}
