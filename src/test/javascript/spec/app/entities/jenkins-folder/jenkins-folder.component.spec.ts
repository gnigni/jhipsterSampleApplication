/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsFolderComponent } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.component';
import { JenkinsFolderService } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.service';
import { JenkinsFolder } from '../../../../../../main/webapp/app/entities/jenkins-folder/jenkins-folder.model';

describe('Component Tests', () => {

    describe('JenkinsFolder Management Component', () => {
        let comp: JenkinsFolderComponent;
        let fixture: ComponentFixture<JenkinsFolderComponent>;
        let service: JenkinsFolderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsFolderComponent],
                providers: [
                    JenkinsFolderService
                ]
            })
            .overrideTemplate(JenkinsFolderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsFolderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JenkinsFolder(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jenkinsFolders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
