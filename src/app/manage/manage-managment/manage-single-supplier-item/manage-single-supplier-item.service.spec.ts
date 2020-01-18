import { Test, TestingModule } from '@nestjs/testing';
import { ManageSingleSupplierItemService } from './manage-single-supplier-item.service';

describe('ManageSingleSupplierItemService', () => {
  let service: ManageSingleSupplierItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSingleSupplierItemService],
    }).compile();

    service = module.get<ManageSingleSupplierItemService>(ManageSingleSupplierItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
