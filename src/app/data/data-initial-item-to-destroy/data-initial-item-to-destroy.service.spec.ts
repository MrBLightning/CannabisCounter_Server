import { Test, TestingModule } from '@nestjs/testing';
import { DataInitialItemToDestroyService } from './data-initial-item-to-destroy.service';

describe('DataInitialItemToDestroyService', () => {
  let service: DataInitialItemToDestroyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataInitialItemToDestroyService],
    }).compile();

    service = module.get<DataInitialItemToDestroyService>(DataInitialItemToDestroyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
