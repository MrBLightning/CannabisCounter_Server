import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemToConvertService } from './data-initial-item-to-convert.service';

describe('DataInitialItemToConvertService', () => {
  let service: DataInitialItemToConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInitialItemToConvertService],
    }).compile();

    service = module.get<DataInitialItemToConvertService>(DataInitialItemToConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
