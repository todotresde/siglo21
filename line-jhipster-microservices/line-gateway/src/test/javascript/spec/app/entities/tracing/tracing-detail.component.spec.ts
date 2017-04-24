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
                declarations: [TracingDetailComponent],
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
                    TracingService
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
