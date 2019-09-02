import { TestBed } from '@angular/core/testing';

import { IronService } from './iron.service';

describe('IronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IronService = TestBed.get(IronService);
    expect(service).toBeTruthy();
  });
});
