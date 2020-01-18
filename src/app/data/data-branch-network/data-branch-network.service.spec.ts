import { Test, TestingModule } from '@nestjs/testing';
import { DataBranchNetworkService } from './data-branch-network.service';

describe('DataBranchNetworkService', () => {
  let service: DataBranchNetworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataBranchNetworkService],
    }).compile();

    service = module.get<DataBranchNetworkService>(DataBranchNetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
