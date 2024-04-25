import { TestBed } from '@angular/core/testing';

import { GenerarEmailService } from './generar-email.service';

describe('GenerarEmailService', () => {
  let service: GenerarEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
