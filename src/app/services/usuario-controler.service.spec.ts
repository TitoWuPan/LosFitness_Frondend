import { TestBed } from '@angular/core/testing';

import { UsuarioControlerService } from './usuario-controler.service';

describe('UsuarioControlerService', () => {
  let service: UsuarioControlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioControlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
