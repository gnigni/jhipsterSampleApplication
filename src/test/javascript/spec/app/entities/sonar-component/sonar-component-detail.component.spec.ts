/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SonarComponentDetailComponent } from '../../../../../../main/webapp/app/entities/sonar-component/sonar-component-detail.component';
import { SonarComponentService } from '../../../../../../main/webapp/app/entities/sonar-component/sonar-component.service';
import { SonarComponent } from '../../../../../../main/webapp/app/entities/sonar-component/sonar-component.model';

describe('Component Tests', () => {

    describe('SonarComponent Management Detail Component', () => {
        let comp: SonarComponentDetailComponent;
        let fixture: ComponentFixture<SonarComponentDetailComponent>;
        let service: SonarComponentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SonarComponentDetailComponent],
                providers: [
                    SonarComponentService
                ]
            })
            .overrideTemplate(SonarComponentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SonarComponentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonarComponentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SonarComponent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sonarComponent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
