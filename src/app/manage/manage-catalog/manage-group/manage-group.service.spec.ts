import { Test, TestingModule } from '@nestjs/testing';
import { ManageGroupService } from './manage-group.service';

describe('ManageGroupService', () => {
  let service: ManageGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageGroupService],
    }).compile();

    service = module.get<ManageGroupService>(ManageGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
