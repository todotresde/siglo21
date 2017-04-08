import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
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
                declarations: [DelayDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    DelayService
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
