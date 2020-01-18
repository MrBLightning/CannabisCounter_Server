import { Test, TestingModule } from '@nestjs/testing';
import { ManageCodeCoversionService } from './manage-code-conversion.service';

describe('ManageCodeCoversionService', () => {
  let service: ManageCodeCoversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageCodeCoversionService],
    }).compile();

    service = module.get<ManageCodeCoversionService>(ManageCodeCoversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
