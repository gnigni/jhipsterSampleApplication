import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JenkinsFolderComponent } from './jenkins-folder.component';
import { JenkinsFolderDetailComponent } from './jenkins-folder-detail.component';
import { JenkinsFolderPopupComponent } from './jenkins-folder-dialog.component';
import { JenkinsFolderDeletePopupComponent } from './jenkins-folder-delete-dialog.component';

export const jenkinsFolderRoute: Routes = [
    {
        path: 'jenkins-folder',
        component: JenkinsFolderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jenkins-folder/:id',
        component: JenkinsFolderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jenkinsFolderPopupRoute: Routes = [
    {
        path: 'jenkins-folder-new',
        component: JenkinsFolderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jenkins-folder/:id/edit',
        component: JenkinsFolderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jenkins-folder/:id/delete',
        component: JenkinsFolderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
