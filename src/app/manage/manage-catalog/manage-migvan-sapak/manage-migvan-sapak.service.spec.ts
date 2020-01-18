import { Test, TestingModule } from '@nestjs/testing';
import { ManageMigvanSapakService } from './manage-migvan-sapak.service';

describe('ManageMigvanSapakService', () => {
  let service: ManageMigvanSapakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageMigvanSapakService],
    }).compile();

    service = module.get<ManageMigvanSapakService>(ManageMigvanSapakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
