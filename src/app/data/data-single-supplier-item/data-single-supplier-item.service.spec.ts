import { Test, TestingModule } from '@nestjs/testing';
import { DataSingleSupplierItemService } from './data-single-supplier-item.service';

describe('DataSingleSupplierItemService', () => {
  let service: DataSingleSupplierItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSingleSupplierItemService],
    }).compile();

    service = module.get<DataSingleSupplierItemService>(DataSingleSupplierItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
