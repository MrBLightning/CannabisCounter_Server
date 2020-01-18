import { Test, TestingModule } from '@nestjs/testing';
import { DataScrmenuService } from './data-scrmenu.service';

describe('DataScrmenuService', () => {
  let service: DataScrmenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataScrmenuService],
    }).compile();

    service = module.get<DataScrmenuService>(DataScrmenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
