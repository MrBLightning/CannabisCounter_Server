import { Test, TestingModule } from '@nestjs/testing';
import { DataMigvanBranchService } from './data-migvan-branch.service';

describe('DataMigvanBranchService', () => {
  let service: DataMigvanBranchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataMigvanBranchService],
    }).compile();

    service = module.get<DataMigvanBranchService>(DataMigvanBranchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
