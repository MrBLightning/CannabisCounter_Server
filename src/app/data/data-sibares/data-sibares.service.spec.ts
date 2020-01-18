import { Test, TestingModule } from '@nestjs/testing';
import { DataSibaresService } from './data-sibares.service';

describe('DataSibaresService', () => {
  let service: DataSibaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSibaresService],
    }).compile();

    service = module.get<DataSibaresService>(DataSibaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
