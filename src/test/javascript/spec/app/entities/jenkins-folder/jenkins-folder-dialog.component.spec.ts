/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsFolderDialogComponent } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder-dialog.component';
import { JenkinsFolderService } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.service';
import { JenkinsFolder } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.model';
import { MavenModuleService } from '../../../../../../main/webapp/app/entities/maven-module';

describe('Component Tests', () => {

    describe('JenkinsFolder Management Dialog Component', () => {
        let comp: JenkinsFolderDialogComponent;
        let fixture: ComponentFixture<JenkinsFolderDialogComponent>;
        let service: JenkinsFolderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsFolderDialogComponent],
                providers: [
                    MavenModuleService,
                    JenkinsFolderService
                ]
            })
            .overrideTemplate(JenkinsFolderDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsFolderDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JenkinsFolder(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jenkinsFolder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jenkinsFolderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new JenkinsFolder();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.jenkinsFolder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'jenkinsFolderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
