/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Sfi2TestModule } from '../../../test.module';
import { STAttributeDetailComponent } from '../../../../../../main/webapp/app/entities/st-attribute/st-attribute-detail.component';
import { STAttributeService } from '../../../../../../main/webapp/app/entities/st-attribute/st-attribute.service';
import { STAttribute } from '../../../../../../main/webapp/app/entities/st-attribute/st-attribute.model';

describe('Component Tests', () => {

    describe('STAttribute Management Detail Component', () => {
        let comp: STAttributeDetailComponent;
        let fixture: ComponentFixture<STAttributeDetailComponent>;
        let service: STAttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [STAttributeDetailComponent],
                providers: [
                    STAttributeService
                ]
            })
            .overrideTemplate(STAttributeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(STAttributeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(STAttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new STAttribute(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sTAttribute).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
