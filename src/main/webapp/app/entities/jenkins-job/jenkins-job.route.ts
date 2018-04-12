import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JenkinsJobComponent } from './jenkins-job.component';
import { JenkinsJobDetailComponent } from './jenkins-job-detail.component';
import { JenkinsJobPopupComponent } from './jenkins-job-dialog.component';
import { JenkinsJobDeletePopupComponent } from './jenkins-job-delete-dialog.component';

export const jenkinsJobRoute: Routes = [
    {
        path: 'jenkins-job',
        component: JenkinsJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jenkins-job/:id',
        component: JenkinsJobDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jenkinsJobPopupRoute: Routes = [
    {
        path: 'jenkins-job-new',
        component: JenkinsJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jenkins-job/:id/edit',
        component: JenkinsJobPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jenkins-job/:id/delete',
        component: JenkinsJobDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
