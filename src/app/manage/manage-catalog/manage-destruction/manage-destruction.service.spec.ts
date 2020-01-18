import { Test, TestingModule } from '@nestjs/testing';
import { ManageDestructionService } from './manage-destruction.service';

describe('ManageDestructionService', () => {
  let service: ManageDestructionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDestructionService],
    }).compile();

    service = module.get<ManageDestructionService>(ManageDestructionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
