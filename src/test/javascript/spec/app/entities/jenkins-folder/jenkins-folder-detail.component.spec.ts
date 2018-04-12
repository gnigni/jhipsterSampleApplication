/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsFolderDetailComponent } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder-detail.component';
import { JenkinsFolderService } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.service';
import { JenkinsFolder } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.model';

describe('Component Tests', () => {

    describe('JenkinsFolder Management Detail Component', () => {
        let comp: JenkinsFolderDetailComponent;
        let fixture: ComponentFixture<JenkinsFolderDetailComponent>;
        let service: JenkinsFolderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsFolderDetailComponent],
                providers: [
                    JenkinsFolderService
                ]
            })
            .overrideTemplate(JenkinsFolderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsFolderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JenkinsFolder(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jenkinsFolder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
