import { Test, TestingModule } from '@nestjs/testing';
import { DataBranchTypeService } from './data-branch-type.service';

describe('DataBranchTypeService', () => {
  let service: DataBranchTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBranchTypeService],
    }).compile();

    service = module.get<DataBranchTypeService>(DataBranchTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
