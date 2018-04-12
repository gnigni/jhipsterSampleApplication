import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JenkinsFolder } from './jenkins-folder.model';
import { JenkinsFolderService } from './jenkins-folder.service';

@Injectable()
export class JenkinsFolderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jenkinsFolderService: JenkinsFolderService

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
                this.jenkinsFolderService.find(id)
                    .subscribe((jenkinsFolderResponse: HttpResponse<JenkinsFolder>) => {
                        const jenkinsFolder: JenkinsFolder = jenkinsFolderResponse.body;
                        this.ngbModalRef = this.jenkinsFolderModalRef(component, jenkinsFolder);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jenkinsFolderModalRef(component, new JenkinsFolder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jenkinsFolderModalRef(component: Component, jenkinsFolder: JenkinsFolder): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jenkinsFolder = jenkinsFolder;
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
