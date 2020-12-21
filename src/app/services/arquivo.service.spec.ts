import { TestBed } from '@angular/core/testing';

import { ArquivoService } from './arquivo.service';

describe('ArquivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArquivoService = TestBed.get(ArquivoService);
    expect(service).toBeTruthy();
  });
});
