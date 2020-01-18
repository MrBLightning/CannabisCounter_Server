import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubgroupService } from './manage-subgroup.service';

describe('ManageSubgroupService', () => {
  let service: ManageSubgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSubgroupService],
    }).compile();

    service = module.get<ManageSubgroupService>(ManageSubgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
