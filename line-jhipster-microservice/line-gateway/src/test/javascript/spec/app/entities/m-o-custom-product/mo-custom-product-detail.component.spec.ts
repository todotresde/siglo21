import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { LineGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MOCustomProductDetailComponent } from '../../../../../../main/webapp/app/entities/m-o-custom-product/mo-custom-product-detail.component';
import { MOCustomProductService } from '../../../../../../main/webapp/app/entities/m-o-custom-product/mo-custom-product.service';
import { MOCustomProduct } from '../../../../../../main/webapp/app/entities/m-o-custom-product/mo-custom-product.model';

describe('Component Tests', () => {

    describe('MOCustomProduct Management Detail Component', () => {
        let comp: MOCustomProductDetailComponent;
        let fixture: ComponentFixture<MOCustomProductDetailComponent>;
        let service: MOCustomProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LineGatewayTestModule],
                declarations: [MOCustomProductDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MOCustomProductService,
                    EventManager
                ]
            }).overrideComponent(MOCustomProductDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MOCustomProductDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MOCustomProductService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MOCustomProduct(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mOCustomProduct).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
