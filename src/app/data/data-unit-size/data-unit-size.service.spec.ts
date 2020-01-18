import { Test, TestingModule } from '@nestjs/testing';
import { DataUnitSizeService } from './data-unit-size.service';

describe('DataUnitSizeService', () => {
  let service: DataUnitSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataUnitSizeService],
    }).compile();

    service = module.get<DataUnitSizeService>(DataUnitSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
