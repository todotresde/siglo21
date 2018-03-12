import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { LineGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MODetailComponent } from '../../../../../../main/webapp/app/entities/m-o/mo-detail.component';
import { MOService } from '../../../../../../main/webapp/app/entities/m-o/mo.service';
import { MO } from '../../../../../../main/webapp/app/entities/m-o/mo.model';

describe('Component Tests', () => {

    describe('MO Management Detail Component', () => {
        let comp: MODetailComponent;
        let fixture: ComponentFixture<MODetailComponent>;
        let service: MOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LineGatewayTestModule],
                declarations: [MODetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MOService,
                    EventManager
                ]
            }).overrideComponent(MODetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MOService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MO(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mO).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
