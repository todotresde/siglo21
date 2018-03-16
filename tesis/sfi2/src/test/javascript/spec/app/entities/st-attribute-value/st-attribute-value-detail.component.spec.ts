/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Sfi2TestModule } from '../../../test.module';
import { STAttributeValueDetailComponent } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value-detail.component';
import { STAttributeValueService } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.service';
import { STAttributeValue } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.model';

describe('Component Tests', () => {

    describe('STAttributeValue Management Detail Component', () => {
        let comp: STAttributeValueDetailComponent;
        let fixture: ComponentFixture<STAttributeValueDetailComponent>;
        let service: STAttributeValueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [STAttributeValueDetailComponent],
                providers: [
                    STAttributeValueService
                ]
            })
            .overrideTemplate(STAttributeValueDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(STAttributeValueDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(STAttributeValueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new STAttributeValue(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sTAttributeValue).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
