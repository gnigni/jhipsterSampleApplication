/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobBuildDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build-delete-dialog.component';
import { JenkinsJobBuildService } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.service';

describe('Component Tests', () => {

    describe('JenkinsJobBuild Management Delete Component', () => {
        let comp: JenkinsJobBuildDeleteDialogComponent;
        let fixture: ComponentFixture<JenkinsJobBuildDeleteDialogComponent>;
        let service: JenkinsJobBuildService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobBuildDeleteDialogComponent],
                providers: [
                    JenkinsJobBuildService
                ]
            })
            .overrideTemplate(JenkinsJobBuildDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobBuildDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobBuildService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
