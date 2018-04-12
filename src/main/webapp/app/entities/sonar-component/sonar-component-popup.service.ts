import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SonarComponent } from './sonar-component.model';
import { SonarComponentService } from './sonar-component.service';

@Injectable()
export class SonarComponentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sonarComponentService: SonarComponentService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sonarComponentService.find(id)
                    .subscribe((sonarComponentResponse: HttpResponse<SonarComponent>) => {
                        const sonarComponent: SonarComponent = sonarComponentResponse.body;
                        this.ngbModalRef = this.sonarComponentModalRef(component, sonarComponent);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sonarComponentModalRef(component, new SonarComponent());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sonarComponentModalRef(component: Component, sonarComponent: SonarComponent): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sonarComponent = sonarComponent;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
