import { TestBed } from '@angular/core/testing';

import { ProductdbserviceService } from './productdbservice.service';

describe('ProductdbserviceService', () => {
  let service: ProductdbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductdbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
