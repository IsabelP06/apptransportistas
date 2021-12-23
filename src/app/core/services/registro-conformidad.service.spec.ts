import { TestBed } from '@angular/core/testing';

import { RegistroConformidadService } from './registro-conformidad.service';

describe('RegistroConformidadService', () => {
  let service: RegistroConformidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroConformidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
