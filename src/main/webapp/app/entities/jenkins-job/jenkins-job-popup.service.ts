import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JenkinsJob } from './jenkins-job.model';
import { JenkinsJobService } from './jenkins-job.service';

@Injectable()
export class JenkinsJobPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jenkinsJobService: JenkinsJobService

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
                this.jenkinsJobService.find(id)
                    .subscribe((jenkinsJobResponse: HttpResponse<JenkinsJob>) => {
                        const jenkinsJob: JenkinsJob = jenkinsJobResponse.body;
                        this.ngbModalRef = this.jenkinsJobModalRef(component, jenkinsJob);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jenkinsJobModalRef(component, new JenkinsJob());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jenkinsJobModalRef(component: Component, jenkinsJob: JenkinsJob): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jenkinsJob = jenkinsJob;
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
