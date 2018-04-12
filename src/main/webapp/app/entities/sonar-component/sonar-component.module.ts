import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    SonarComponentService,
    SonarComponentPopupService,
    SonarComponentComponent,
    SonarComponentDetailComponent,
    SonarComponentDialogComponent,
    SonarComponentPopupComponent,
    SonarComponentDeletePopupComponent,
    SonarComponentDeleteDialogComponent,
    sonarComponentRoute,
    sonarComponentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sonarComponentRoute,
    ...sonarComponentPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SonarComponentComponent,
        SonarComponentDetailComponent,
        SonarComponentDialogComponent,
        SonarComponentDeleteDialogComponent,
        SonarComponentPopupComponent,
        SonarComponentDeletePopupComponent,
    ],
    entryComponents: [
        SonarComponentComponent,
        SonarComponentDialogComponent,
        SonarComponentPopupComponent,
        SonarComponentDeleteDialogComponent,
        SonarComponentDeletePopupComponent,
    ],
    providers: [
        SonarComponentService,
        SonarComponentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationSonarComponentModule {}
