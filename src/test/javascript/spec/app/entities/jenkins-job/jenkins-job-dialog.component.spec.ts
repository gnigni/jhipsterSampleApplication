/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobDialogComponent } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job-dialog.component';
import { JenkinsJobService } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.service';
import { JenkinsJob } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.model';
import { JenkinsFolderService } from '../../../../../../main/webapp/app/entities/jenkins-folder';

describe('Component Tests', () => {

    describe('JenkinsJob Management Dialog Component', () => {
        let comp: JenkinsJobDialogComponent;
        let fixture: ComponentFixture<JenkinsJobDialogComponent>;
        let service: JenkinsJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobDialogComponent],
                providers: [
                    JenkinsFolderService,
                    JenkinsJobService
                ]
            })
            .overrideTemplate(JenkinsJobDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JenkinsJob(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jenkinsJob = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jenkinsJobListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JenkinsJob();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jenkinsJob = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jenkinsJobListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
