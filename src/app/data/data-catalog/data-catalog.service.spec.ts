import { Test, TestingModule } from '@nestjs/testing';
import { DataCatalogService } from './data-catalog.service';

describe('DataCatalogService', () => {
  let service: DataCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCatalogService],
    }).compile();

    service = module.get<DataCatalogService>(DataCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
