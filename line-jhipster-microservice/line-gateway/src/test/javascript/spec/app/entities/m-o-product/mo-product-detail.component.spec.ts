import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { LineGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MOProductDetailComponent } from '../../../../../../main/webapp/app/entities/m-o-product/mo-product-detail.component';
import { MOProductService } from '../../../../../../main/webapp/app/entities/m-o-product/mo-product.service';
import { MOProduct } from '../../../../../../main/webapp/app/entities/m-o-product/mo-product.model';

describe('Component Tests', () => {

    describe('MOProduct Management Detail Component', () => {
        let comp: MOProductDetailComponent;
        let fixture: ComponentFixture<MOProductDetailComponent>;
        let service: MOProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LineGatewayTestModule],
                declarations: [MOProductDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MOProductService,
                    EventManager
                ]
            }).overrideComponent(MOProductDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MOProductDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MOProductService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MOProduct(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mOProduct).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
