import { Test, TestingModule } from '@nestjs/testing';
import { ManageDegemService } from './manage-degem.service';

describe('ManageDegemService', () => {
  let service: ManageDegemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDegemService],
    }).compile();

    service = module.get<ManageDegemService>(ManageDegemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
