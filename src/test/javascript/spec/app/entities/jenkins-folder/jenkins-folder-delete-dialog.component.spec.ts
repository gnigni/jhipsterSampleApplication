/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsFolderDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder-delete-dialog.component';
import { JenkinsFolderService } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.service';

describe('Component Tests', () => {

    describe('JenkinsFolder Management Delete Component', () => {
        let comp: JenkinsFolderDeleteDialogComponent;
        let fixture: ComponentFixture<JenkinsFolderDeleteDialogComponent>;
        let service: JenkinsFolderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsFolderDeleteDialogComponent],
                providers: [
                    JenkinsFolderService
                ]
            })
            .overrideTemplate(JenkinsFolderDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsFolderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
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
