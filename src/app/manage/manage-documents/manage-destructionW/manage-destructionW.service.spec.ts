import { Test, TestingModule } from '@nestjs/testing';
import { ManageDestructionWService } from './manage-destructionW.service';

describe('ManageDestructionWService', () => {
  let service: ManageDestructionWService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDestructionWService],
    }).compile();

    service = module.get<ManageDestructionWService>(ManageDestructionWService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
