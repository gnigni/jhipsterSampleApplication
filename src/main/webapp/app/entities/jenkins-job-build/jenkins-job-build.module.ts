import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    JenkinsJobBuildService,
    JenkinsJobBuildPopupService,
    JenkinsJobBuildComponent,
    JenkinsJobBuildDetailComponent,
    JenkinsJobBuildDialogComponent,
    JenkinsJobBuildPopupComponent,
    JenkinsJobBuildDeletePopupComponent,
    JenkinsJobBuildDeleteDialogComponent,
    jenkinsJobBuildRoute,
    jenkinsJobBuildPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jenkinsJobBuildRoute,
    ...jenkinsJobBuildPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JenkinsJobBuildComponent,
        JenkinsJobBuildDetailComponent,
        JenkinsJobBuildDialogComponent,
        JenkinsJobBuildDeleteDialogComponent,
        JenkinsJobBuildPopupComponent,
        JenkinsJobBuildDeletePopupComponent,
    ],
    entryComponents: [
        JenkinsJobBuildComponent,
        JenkinsJobBuildDialogComponent,
        JenkinsJobBuildPopupComponent,
        JenkinsJobBuildDeleteDialogComponent,
        JenkinsJobBuildDeletePopupComponent,
    ],
    providers: [
        JenkinsJobBuildService,
        JenkinsJobBuildPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationJenkinsJobBuildModule {}
