import { Test, TestingModule } from '@nestjs/testing';
import { DataDegemService } from './data-degem.service';

describe('DataDegemService', () => {
  let service: DataDegemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataDegemService],
    }).compile();

    service = module.get<DataDegemService>(DataDegemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
