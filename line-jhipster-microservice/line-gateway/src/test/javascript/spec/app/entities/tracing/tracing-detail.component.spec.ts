import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { LineGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TracingDetailComponent } from '../../../../../../main/webapp/app/entities/tracing/tracing-detail.component';
import { TracingService } from '../../../../../../main/webapp/app/entities/tracing/tracing.service';
import { Tracing } from '../../../../../../main/webapp/app/entities/tracing/tracing.model';

describe('Component Tests', () => {

    describe('Tracing Management Detail Component', () => {
        let comp: TracingDetailComponent;
        let fixture: ComponentFixture<TracingDetailComponent>;
        let service: TracingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LineGatewayTestModule],
                declarations: [TracingDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TracingService,
                    EventManager
                ]
            }).overrideComponent(TracingDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TracingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TracingService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tracing(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tracing).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
