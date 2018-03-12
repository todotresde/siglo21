import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { LineGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DelayDetailComponent } from '../../../../../../main/webapp/app/entities/delay/delay-detail.component';
import { DelayService } from '../../../../../../main/webapp/app/entities/delay/delay.service';
import { Delay } from '../../../../../../main/webapp/app/entities/delay/delay.model';

describe('Component Tests', () => {

    describe('Delay Management Detail Component', () => {
        let comp: DelayDetailComponent;
        let fixture: ComponentFixture<DelayDetailComponent>;
        let service: DelayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LineGatewayTestModule],
                declarations: [DelayDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DelayService,
                    EventManager
                ]
            }).overrideComponent(DelayDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Delay(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.delay).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
