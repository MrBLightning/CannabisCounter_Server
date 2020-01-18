import { Test, TestingModule } from '@nestjs/testing';
import { DataGroupService } from './data-group.service';

describe('DataGroupService', () => {
  let service: DataGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataGroupService],
    }).compile();

    service = module.get<DataGroupService>(DataGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
