import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JenkinsJobBuildComponent } from './jenkins-job-build.component';
import { JenkinsJobBuildDetailComponent } from './jenkins-job-build-detail.component';
import { JenkinsJobBuildPopupComponent } from './jenkins-job-build-dialog.component';
import { JenkinsJobBuildDeletePopupComponent } from './jenkins-job-build-delete-dialog.component';

export const jenkinsJobBuildRoute: Routes = [
    {
        path: 'jenkins-job-build',
        component: JenkinsJobBuildComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jenkins-job-build/:id',
        component: JenkinsJobBuildDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jenkinsJobBuildPopupRoute: Routes = [
    {
        path: 'jenkins-job-build-new',
        component: JenkinsJobBuildPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jenkins-job-build/:id/edit',
        component: JenkinsJobBuildPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jenkins-job-build/:id/delete',
        component: JenkinsJobBuildDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
