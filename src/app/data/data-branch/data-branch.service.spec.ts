import { Test, TestingModule } from '@nestjs/testing';
import { DataBranchService } from './data-branch.service';

describe('DataBranchService', () => {
  let service: DataBranchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBranchService],
    }).compile();

    service = module.get<DataBranchService>(DataBranchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
