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
import { WSConfigurationDetailComponent } from '../../../../../../main/webapp/app/entities/w-s-configuration/ws-configuration-detail.component';
import { WSConfigurationService } from '../../../../../../main/webapp/app/entities/w-s-configuration/ws-configuration.service';
import { WSConfiguration } from '../../../../../../main/webapp/app/entities/w-s-configuration/ws-configuration.model';

describe('Component Tests', () => {

    describe('WSConfiguration Management Detail Component', () => {
        let comp: WSConfigurationDetailComponent;
        let fixture: ComponentFixture<WSConfigurationDetailComponent>;
        let service: WSConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WSConfigurationDetailComponent],
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
                    WSConfigurationService
                ]
            }).overrideComponent(WSConfigurationDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WSConfigurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WSConfigurationService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new WSConfiguration(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.wSConfiguration).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
