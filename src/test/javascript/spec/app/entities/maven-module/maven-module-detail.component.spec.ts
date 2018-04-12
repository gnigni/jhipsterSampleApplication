/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MavenModuleDetailComponent } from '../../../../../../main/webapp/app/entities/maven-module/maven-module-detail.component';
import { MavenModuleService } from '../../../../../../main/webapp/app/entities/maven-module/maven-module.service';
import { MavenModule } from '../../../../../../main/webapp/app/entities/maven-module/maven-module.model';

describe('Component Tests', () => {

    describe('MavenModule Management Detail Component', () => {
        let comp: MavenModuleDetailComponent;
        let fixture: ComponentFixture<MavenModuleDetailComponent>;
        let service: MavenModuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MavenModuleDetailComponent],
                providers: [
                    MavenModuleService
                ]
            })
            .overrideTemplate(MavenModuleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MavenModuleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MavenModuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MavenModule(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mavenModule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
