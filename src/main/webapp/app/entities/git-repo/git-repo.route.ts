import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GitRepoComponent } from './git-repo.component';
import { GitRepoDetailComponent } from './git-repo-detail.component';
import { GitRepoPopupComponent } from './git-repo-dialog.component';
import { GitRepoDeletePopupComponent } from './git-repo-delete-dialog.component';

export const gitRepoRoute: Routes = [
    {
        path: 'git-repo',
        component: GitRepoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'git-repo/:id',
        component: GitRepoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gitRepoPopupRoute: Routes = [
    {
        path: 'git-repo-new',
        component: GitRepoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'git-repo/:id/edit',
        component: GitRepoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'git-repo/:id/delete',
        component: GitRepoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
