import { Test, TestingModule } from '@nestjs/testing';
import { DataSubgroupService } from './data-subgroup.service';

describe('DataSubgroupService', () => {
  let service: DataSubgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSubgroupService],
    }).compile();

    service = module.get<DataSubgroupService>(DataSubgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
