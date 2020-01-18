import { Test, TestingModule } from '@nestjs/testing';
import { ManageAspakaService } from './manage-aspaka.service';

describe('ManageAspakaService', () => {
  let service: ManageAspakaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageAspakaService],
    }).compile();

    service = module.get<ManageAspakaService>(ManageAspakaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
