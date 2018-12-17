import { TestBed } from '@angular/core/testing';

import { PingpongService } from './pingpong.service';

describe('PingpongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PingpongService = TestBed.get(PingpongService);
    expect(service).toBeTruthy();
  });
});
