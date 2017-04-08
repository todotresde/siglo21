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
import { DelayTypeDetailComponent } from '../../../../../../main/webapp/app/entities/delay-type/delay-type-detail.component';
import { DelayTypeService } from '../../../../../../main/webapp/app/entities/delay-type/delay-type.service';
import { DelayType } from '../../../../../../main/webapp/app/entities/delay-type/delay-type.model';

describe('Component Tests', () => {

    describe('DelayType Management Detail Component', () => {
        let comp: DelayTypeDetailComponent;
        let fixture: ComponentFixture<DelayTypeDetailComponent>;
        let service: DelayTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DelayTypeDetailComponent],
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
                    DelayTypeService
                ]
            }).overrideComponent(DelayTypeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayTypeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DelayType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.delayType).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
