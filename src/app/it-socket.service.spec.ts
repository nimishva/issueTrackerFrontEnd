import { TestBed } from '@angular/core/testing';

import { ItSocketService } from './it-socket.service';

describe('ItSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItSocketService = TestBed.get(ItSocketService);
    expect(service).toBeTruthy();
  });
});
