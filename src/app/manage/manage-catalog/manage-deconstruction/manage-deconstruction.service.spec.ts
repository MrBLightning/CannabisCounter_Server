import { Test, TestingModule } from '@nestjs/testing';
import { ManageDeconstructionService } from './manage-deconstruction.service';

describe('ManageDeconstructionService', () => {
  let service: ManageDeconstructionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDeconstructionService],
    }).compile();

    service = module.get<ManageDeconstructionService>(ManageDeconstructionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
