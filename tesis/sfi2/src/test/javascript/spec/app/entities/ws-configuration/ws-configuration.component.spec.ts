/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi2TestModule } from '../../../test.module';
import { WSConfigurationComponent } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.component';
import { WSConfigurationService } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.service';
import { WSConfiguration } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.model';

describe('Component Tests', () => {

    describe('WSConfiguration Management Component', () => {
        let comp: WSConfigurationComponent;
        let fixture: ComponentFixture<WSConfigurationComponent>;
        let service: WSConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [WSConfigurationComponent],
                providers: [
                    WSConfigurationService
                ]
            })
            .overrideTemplate(WSConfigurationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WSConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WSConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WSConfiguration(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.wSConfigurations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
