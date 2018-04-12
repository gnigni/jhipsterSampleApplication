/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobBuildDialogComponent } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build-dialog.component';
import { JenkinsJobBuildService } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.service';
import { JenkinsJobBuild } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.model';
import { JenkinsJobService } from '../../../../../../main/webapp/app/entities/jenkins-job';

describe('Component Tests', () => {

    describe('JenkinsJobBuild Management Dialog Component', () => {
        let comp: JenkinsJobBuildDialogComponent;
        let fixture: ComponentFixture<JenkinsJobBuildDialogComponent>;
        let service: JenkinsJobBuildService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobBuildDialogComponent],
                providers: [
                    JenkinsJobService,
                    JenkinsJobBuildService
                ]
            })
            .overrideTemplate(JenkinsJobBuildDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobBuildDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobBuildService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JenkinsJobBuild(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jenkinsJobBuild = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jenkinsJobBuildListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JenkinsJobBuild();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jenkinsJobBuild = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jenkinsJobBuildListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
