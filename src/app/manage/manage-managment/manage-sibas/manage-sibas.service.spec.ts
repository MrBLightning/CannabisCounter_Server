import { Test, TestingModule } from '@nestjs/testing';
import { ManageSibasService } from './manage-sibas.service';

describe('ManageSibasService', () => {
  let service: ManageSibasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSibasService],
    }).compile();

    service = module.get<ManageSibasService>(ManageSibasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
