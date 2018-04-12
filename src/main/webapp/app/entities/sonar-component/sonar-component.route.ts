import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SonarComponentComponent } from './sonar-component.component';
import { SonarComponentDetailComponent } from './sonar-component-detail.component';
import { SonarComponentPopupComponent } from './sonar-component-dialog.component';
import { SonarComponentDeletePopupComponent } from './sonar-component-delete-dialog.component';

export const sonarComponentRoute: Routes = [
    {
        path: 'sonar-component',
        component: SonarComponentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sonar-component/:id',
        component: SonarComponentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sonarComponentPopupRoute: Routes = [
    {
        path: 'sonar-component-new',
        component: SonarComponentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sonar-component/:id/edit',
        component: SonarComponentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sonar-component/:id/delete',
        component: SonarComponentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
