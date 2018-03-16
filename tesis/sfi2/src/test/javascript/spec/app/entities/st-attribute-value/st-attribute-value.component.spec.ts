/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi2TestModule } from '../../../test.module';
import { STAttributeValueComponent } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.component';
import { STAttributeValueService } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.service';
import { STAttributeValue } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.model';

describe('Component Tests', () => {

    describe('STAttributeValue Management Component', () => {
        let comp: STAttributeValueComponent;
        let fixture: ComponentFixture<STAttributeValueComponent>;
        let service: STAttributeValueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [STAttributeValueComponent],
                providers: [
                    STAttributeValueService
                ]
            })
            .overrideTemplate(STAttributeValueComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(STAttributeValueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(STAttributeValueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new STAttributeValue(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sTAttributeValues[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
