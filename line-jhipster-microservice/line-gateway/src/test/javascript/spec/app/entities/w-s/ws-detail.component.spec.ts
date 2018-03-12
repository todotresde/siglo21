import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { LineGatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { WSDetailComponent } from '../../../../../../main/webapp/app/entities/w-s/ws-detail.component';
import { WSService } from '../../../../../../main/webapp/app/entities/w-s/ws.service';
import { WS } from '../../../../../../main/webapp/app/entities/w-s/ws.model';

describe('Component Tests', () => {

    describe('WS Management Detail Component', () => {
        let comp: WSDetailComponent;
        let fixture: ComponentFixture<WSDetailComponent>;
        let service: WSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LineGatewayTestModule],
                declarations: [WSDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    WSService,
                    EventManager
                ]
            }).overrideComponent(WSDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WSService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new WS(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.wS).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
