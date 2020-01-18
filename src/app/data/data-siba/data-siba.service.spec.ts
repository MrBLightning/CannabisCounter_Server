import { Test, TestingModule } from '@nestjs/testing';
import { DataSibaService } from './data-siba.service';

describe('DataSibaService', () => {
  let service: DataSibaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSibaService],
    }).compile();

    service = module.get<DataSibaService>(DataSibaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
