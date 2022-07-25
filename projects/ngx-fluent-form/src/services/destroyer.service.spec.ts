import { TestBed } from '@angular/core/testing';

import { Destroyer } from './destroyer.service';

describe('DestroyerService', () => {
  let service: Destroyer;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Destroyer] });
    service = TestBed.inject(Destroyer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
