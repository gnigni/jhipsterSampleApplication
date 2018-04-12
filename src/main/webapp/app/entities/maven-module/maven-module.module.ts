import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    MavenModuleService,
    MavenModulePopupService,
    MavenModuleComponent,
    MavenModuleDetailComponent,
    MavenModuleDialogComponent,
    MavenModulePopupComponent,
    MavenModuleDeletePopupComponent,
    MavenModuleDeleteDialogComponent,
    mavenModuleRoute,
    mavenModulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...mavenModuleRoute,
    ...mavenModulePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MavenModuleComponent,
        MavenModuleDetailComponent,
        MavenModuleDialogComponent,
        MavenModuleDeleteDialogComponent,
        MavenModulePopupComponent,
        MavenModuleDeletePopupComponent,
    ],
    entryComponents: [
        MavenModuleComponent,
        MavenModuleDialogComponent,
        MavenModulePopupComponent,
        MavenModuleDeleteDialogComponent,
        MavenModuleDeletePopupComponent,
    ],
    providers: [
        MavenModuleService,
        MavenModulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationMavenModuleModule {}
