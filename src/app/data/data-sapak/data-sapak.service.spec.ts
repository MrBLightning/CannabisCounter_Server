import { Test, TestingModule } from '@nestjs/testing';
import { DataSapakService } from './data-sapak.service';

describe('DataSapakService', () => {
  let service: DataSapakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSapakService],
    }).compile();

    service = module.get<DataSapakService>(DataSapakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
