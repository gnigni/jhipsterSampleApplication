import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    JenkinsFolderService,
    JenkinsFolderPopupService,
    JenkinsFolderComponent,
    JenkinsFolderDetailComponent,
    JenkinsFolderDialogComponent,
    JenkinsFolderPopupComponent,
    JenkinsFolderDeletePopupComponent,
    JenkinsFolderDeleteDialogComponent,
    jenkinsFolderRoute,
    jenkinsFolderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jenkinsFolderRoute,
    ...jenkinsFolderPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JenkinsFolderComponent,
        JenkinsFolderDetailComponent,
        JenkinsFolderDialogComponent,
        JenkinsFolderDeleteDialogComponent,
        JenkinsFolderPopupComponent,
        JenkinsFolderDeletePopupComponent,
    ],
    entryComponents: [
        JenkinsFolderComponent,
        JenkinsFolderDialogComponent,
        JenkinsFolderPopupComponent,
        JenkinsFolderDeleteDialogComponent,
        JenkinsFolderDeletePopupComponent,
    ],
    providers: [
        JenkinsFolderService,
        JenkinsFolderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationJenkinsFolderModule {}
