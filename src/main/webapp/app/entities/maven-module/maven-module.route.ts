import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MavenModuleComponent } from './maven-module.component';
import { MavenModuleDetailComponent } from './maven-module-detail.component';
import { MavenModulePopupComponent } from './maven-module-dialog.component';
import { MavenModuleDeletePopupComponent } from './maven-module-delete-dialog.component';

export const mavenModuleRoute: Routes = [
    {
        path: 'maven-module',
        component: MavenModuleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MavenModules'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'maven-module/:id',
        component: MavenModuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MavenModules'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mavenModulePopupRoute: Routes = [
    {
        path: 'maven-module-new',
        component: MavenModulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MavenModules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'maven-module/:id/edit',
        component: MavenModulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MavenModules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'maven-module/:id/delete',
        component: MavenModuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MavenModules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
