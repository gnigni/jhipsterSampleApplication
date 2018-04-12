/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobBuildDetailComponent } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build-detail.component';
import { JenkinsJobBuildService } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.service';
import { JenkinsJobBuild } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.model';

describe('Component Tests', () => {

    describe('JenkinsJobBuild Management Detail Component', () => {
        let comp: JenkinsJobBuildDetailComponent;
        let fixture: ComponentFixture<JenkinsJobBuildDetailComponent>;
        let service: JenkinsJobBuildService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobBuildDetailComponent],
                providers: [
                    JenkinsJobBuildService
                ]
            })
            .overrideTemplate(JenkinsJobBuildDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobBuildDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobBuildService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JenkinsJobBuild(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jenkinsJobBuild).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
