import { Test, TestingModule } from '@nestjs/testing';
import { DataCountersService } from './data-counters.service';

describe('DataCountersService', () => {
  let service: DataCountersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCountersService],
    }).compile();

    service = module.get<DataCountersService>(DataCountersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
