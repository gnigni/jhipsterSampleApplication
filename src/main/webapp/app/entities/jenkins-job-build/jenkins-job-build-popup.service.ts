import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JenkinsJobBuild } from './jenkins-job-build.model';
import { JenkinsJobBuildService } from './jenkins-job-build.service';

@Injectable()
export class JenkinsJobBuildPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jenkinsJobBuildService: JenkinsJobBuildService

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
                this.jenkinsJobBuildService.find(id)
                    .subscribe((jenkinsJobBuildResponse: HttpResponse<JenkinsJobBuild>) => {
                        const jenkinsJobBuild: JenkinsJobBuild = jenkinsJobBuildResponse.body;
                        this.ngbModalRef = this.jenkinsJobBuildModalRef(component, jenkinsJobBuild);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jenkinsJobBuildModalRef(component, new JenkinsJobBuild());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jenkinsJobBuildModalRef(component: Component, jenkinsJobBuild: JenkinsJobBuild): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jenkinsJobBuild = jenkinsJobBuild;
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
